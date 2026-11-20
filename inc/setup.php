<?php
if (!defined('ABSPATH')) { exit; }
add_action('admin_menu', function () {
    add_management_page('TUNIQUE 初期設定', 'TUNIQUE 初期設定', 'manage_options', 'tunique-setup', 'tunique_setup_screen');
});
function tunique_setup_screen() {
    if (!current_user_can('manage_options')) { return; }
    echo '<div class="wrap"><h1>TUNIQUE 初期設定</h1>';
    if (isset($_POST['tunique_import'])) {
        check_admin_referer('tunique_import');
        $result = tunique_import();
        echo '<div class="notice ' . (is_wp_error($result) ? 'notice-error' : 'notice-success') . '"><p>' . esc_html(is_wp_error($result) ? $result->get_error_message() : $result) . '</p></div>';
    }
    if (isset($_POST['tunique_save_contact'])) {
        check_admin_referer('tunique_contact_settings');
        $email = sanitize_email(wp_unslash($_POST['recipient'] ?? ''));
        if ($email && !is_email($email)) { echo '<p>メールアドレスを確認してください。</p>'; }
        else {
            update_option('tunique_contact_recipient', $email);
            update_option('tunique_contact_enabled', !empty($_POST['enabled']) && is_email($email) ? '1' : '0');
            echo '<div class="notice notice-success"><p>受付設定を保存しました。</p></div>';
        }
    }
    ?><h2>1. 制作確認用サイトへデータを取り込む</h2>
    <p>固定ページ7件、承認済みコラム3件、コラムの写真を取り込みます。トップページを設定し、記事URLを /columns/投稿名/ にそろえます。</p>
    <p>この操作は、検索への掲載が無効で、URLに /tunique-preview がある制作確認用サイトでだけ実行できます。既存の個人ブログでは実行しないでください。同じ取り込みを再実行しても、取り込み済みの記事は上書きしません。</p>
    <form method="post"><?php wp_nonce_field('tunique_import'); ?><button class="button button-primary" name="tunique_import" value="1">制作確認用データを取り込む</button></form>
    <h2>2. お問い合わせの受付設定</h2>
    <p>初期状態では受付を停止しています。受信テスト時に送信先を設定して有効にしてください。制作確認終了後は再び停止し、本番切り替え時に確認します。メールはWordPressのメール機能を使います。必要に応じてSMTP設定を行ってください。</p>
    <form method="post"><?php wp_nonce_field('tunique_contact_settings'); ?>
    <p><label>受付メールアドレス <input type="email" name="recipient" value="<?php echo esc_attr(get_option('tunique_contact_recipient', '')); ?>" class="regular-text"></label></p>
    <p><label><input type="checkbox" name="enabled" value="1" <?php checked(get_option('tunique_contact_enabled'), '1'); ?>>お問い合わせの送信受付を有効にする（受信テストが必要です）</label></p>
    <button class="button" name="tunique_save_contact" value="1">受付設定を保存</button></form></div><?php
}
function tunique_import() {
    if (!current_user_can('manage_options')) { return new WP_Error('permission', '管理者権限が必要です。'); }
    if ((string)get_option('blog_public') !== '0' || !preg_match('~/tunique-preview/?$~', (string)wp_parse_url(home_url(), PHP_URL_PATH))) {
        return new WP_Error('staging', '制作確認用URLと、検索への掲載を無効にする設定を確認してください。');
    }
    $data = json_decode(file_get_contents(dirname(__DIR__) . '/data/content.json'), true);
    if (!$data || count($data['posts']) !== 3) { return new WP_Error('data', '取り込みデータを読み込めませんでした。'); }
    // Check all slug conflicts before any mutation. Existing owner content is never overwritten.
    foreach (array('pages' => 'page', 'posts' => 'post') as $group => $type) {
        foreach ($data[$group] as $item) {
            $existing = get_page_by_path($item['slug'], OBJECT, $type);
            if ($existing && get_post_meta($existing->ID, '_tunique_import', true) !== $item['slug']) {
                return new WP_Error('conflict', '同じURLの既存コンテンツがあります：' . $item['slug'] . '。上書きせず中止しました。');
            }
        }
    }
    update_option('timezone_string', 'Asia/Tokyo');
    $parent_term = term_exists('tunique-column', 'category');
    if (!$parent_term) { $parent_term = wp_insert_term('コラム', 'category', array('slug' => 'tunique-column')); }
    if (is_wp_error($parent_term)) { return $parent_term; }
    $column_category = (int)(is_array($parent_term) ? $parent_term['term_id'] : $parent_term);
    update_option('default_category', $column_category);
    $home = 0;
    foreach (array('pages' => 'page', 'posts' => 'post') as $group => $type) {
        foreach ($data[$group] as $item) {
            $existing = get_page_by_path($item['slug'], OBJECT, $type);
            $id = $existing ? $existing->ID : 0;
            if (!$id) {
                $args = array('post_type' => $type, 'post_name' => $item['slug'], 'post_title' => $item['title'],
                    'post_status' => 'publish', 'post_content' => $item['content'], 'post_author' => get_current_user_id(),
                    'meta_input' => array('_tunique_import' => $item['slug'], '_tunique_description' => $item['description']));
                if ($type === 'post') {
                    $args['post_excerpt'] = $item['description'];
                    $args['post_date'] = $item['date'] . ' 00:00:00';
                    $args['meta_input'] += array('_tunique_author' => '伊藤雅和', '_tunique_credit' => $item['credit'], '_tunique_full_frame' => $item['full_frame'] ? '1' : '');
                }
                $id = wp_insert_post(wp_slash($args), true);
                if (is_wp_error($id)) { return $id; }
            }
            if ($item['slug'] === 'home') { $home = $id; }
            if ($type === 'post') {
                $cat_name = $item['slug'] === 'tunique-bike-fitting' ? 'フィッティング' : 'ロードバイク';
                $term = term_exists($cat_name, 'category');
                if (!$term) { $term = wp_insert_term($cat_name, 'category'); }
                if (!is_wp_error($term)) { wp_set_post_categories($id, array($column_category, (int)(is_array($term) ? $term['term_id'] : $term))); }
                if (!has_post_thumbnail($id)) {
                    $image = tunique_import_image($item['image'], $item['alt'], $id);
                    if (is_wp_error($image)) { return $image; }
                    set_post_thumbnail($id, $image);
                }
            }
        }
    }
    update_option('show_on_front', 'page'); update_option('page_on_front', $home);
    update_option('permalink_structure', '/columns/%postname%/');
    update_option('blogname', 'TUNIQUE');
    update_option('blogdescription', '一人ひとりに、その人の基準を。');
    update_option('timezone_string', 'Asia/Tokyo');
    flush_rewrite_rules(false);
    return '取り込みが完了しました。「サイトを表示」から、ページ・写真・コラム3件を確認してください。検索への掲載とお問い合わせ受付は停止したままです。';
}
function tunique_import_image($path, $alt, $parent) {
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';
    // Only bundled image paths, never remote URLs or user-provided paths.
    if (!preg_match('~^/images/[a-zA-Z0-9/_-]+\.(jpg|jpeg|png|webp)$~', $path)) { return new WP_Error('image_path', '写真のパスが不正です。'); }
    $source = dirname(__DIR__) . '/assets' . $path;
    if (!is_file($source)) { return new WP_Error('image_missing', '写真がありません：' . $path); }
    $upload = wp_upload_bits(basename($path), null, file_get_contents($source));
    if ($upload['error']) { return new WP_Error('upload', $upload['error']); }
    $attachment = wp_insert_attachment(array('post_mime_type' => wp_check_filetype($upload['file'])['type'],
        'post_title' => $alt, 'post_status' => 'inherit'), $upload['file'], $parent, true);
    if (is_wp_error($attachment)) { return $attachment; }
    update_post_meta($attachment, '_wp_attachment_image_alt', $alt);
    wp_update_attachment_metadata($attachment, wp_generate_attachment_metadata($attachment, $upload['file']));
    return $attachment;
}
