<?php
if (!defined('ABSPATH')) { exit; }
function tunique_contact_types() {
    return array('bike' => 'バイクフィッティングの予約・相談', 'road' => 'ロードバイクフィッティングの予約・相談',
        'keirin' => '競輪フィッティングの予約・相談', 'travel' => '全国出張フィッティングの依頼', 'life' => 'ライフプラン相談');
}
add_shortcode('tunique_contact', function () {
    $enabled = get_option('tunique_contact_enabled') === '1' && is_email(get_option('tunique_contact_recipient'));
    $type = isset($_GET['type']) ? sanitize_key($_GET['type']) : 'bike';
    if (!isset(tunique_contact_types()[$type])) { $type = 'bike'; }
    ob_start(); ?>
    <form class="contact-form" data-tunique-contact method="post" action="<?php echo esc_url(home_url('/contact/')); ?>">
    <input type="hidden" name="action" value="tunique_contact"><?php wp_nonce_field('tunique_contact', 'tunique_nonce', false); ?>
    <div class="form-honeypot" aria-hidden="true"><label>入力しないでください<input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></div>
    <div class="form-status"><span class="status-dot"></span><div><strong><?php echo $enabled ? 'お問い合わせ内容をお送りください' : 'お問い合わせ受付は準備中です'; ?></strong><p><?php echo $enabled ? 'ご返信はメールでご案内します。' : '現在、このフォームからの送信・保存はできません。'; ?></p></div></div>
    <p class="small">送信時点では予約は確定しません。日程・料金をご確認いただいた後に予約が確定します。</p>
    <fieldset><legend>お問い合わせ種別 <span class="required">必須</span></legend><div class="type-options">
    <?php foreach (tunique_contact_types() as $value => $label) { ?><label<?php echo $value === $type ? ' class="selected"' : ''; ?>><input type="radio" name="type" value="<?php echo esc_attr($value); ?>" <?php checked($type, $value); ?>><?php echo esc_html($label); ?><span aria-hidden="true">↗</span></label><?php } ?></div></fieldset>
    <div class="form-grid"><div class="field"><label for="name">お名前 <span class="required">必須</span></label><input id="name" name="name" autocomplete="name" required maxlength="100"></div><div class="field"><label for="email">メールアドレス <span class="required">必須</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254"></div></div>
    <div class="field"><label for="region">希望する地域 <span class="required" data-region-required>任意</span></label><input id="region" name="region" maxlength="100" placeholder="都道府県・市区町村など"></div>
    <div class="field"><label for="message">お問い合わせ内容 <span class="required">必須</span></label><textarea id="message" name="message" rows="6" maxlength="5000" required aria-describedby="message-note"></textarea><p class="small" id="message-note">口座番号、健康情報などの機微な情報は入力しないでください。</p></div>
    <label class="consent"><input type="checkbox" name="consent" value="1" required><span><a href="<?php echo esc_url(home_url('/privacy/')); ?>">プライバシーポリシー</a>を確認し、同意します。</span></label>
    <button class="button" type="submit" <?php disabled(!$enabled); ?>><?php echo $enabled ? 'お問い合わせを送信する' : '受付準備中'; ?><span aria-hidden="true">↗</span></button><p role="status" aria-live="polite" class="form-result"></p></form>
    <?php return ob_get_clean();
});
// Keep public enquiries out of wp-admin, which hosts may restrict independently.
add_action('init', function () {
    $request_path = wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $contact_path = wp_parse_url(home_url('/contact/'), PHP_URL_PATH);
    if (untrailingslashit((string)$request_path) !== untrailingslashit((string)$contact_path)) { return; }
    if (!defined('DONOTCACHEPAGE')) { define('DONOTCACHEPAGE', true); }
    nocache_headers();
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && ($_POST['action'] ?? '') === 'tunique_contact') {
        tunique_send_contact();
    }
}, 0);
add_action('admin_post_nopriv_tunique_contact', 'tunique_send_contact');
add_action('admin_post_tunique_contact', 'tunique_send_contact');
function tunique_contact_response($success, $message, $status) {
    if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) { wp_send_json(array('success' => $success, 'message' => $message), $status); }
    wp_die(esc_html($message) . '<p><a href="' . esc_url(home_url('/contact/')) . '">お問い合わせへ戻る</a></p>', 'TUNIQUE', array('response' => $status));
}
function tunique_send_contact() {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { tunique_contact_response(false, '送信方法を確認してください。', 405); }
    if (get_option('tunique_contact_enabled') !== '1' || !is_email(get_option('tunique_contact_recipient'))) { tunique_contact_response(false, 'お問い合わせ受付は準備中です。', 503); }
    if (!wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['tunique_nonce'] ?? '')), 'tunique_contact')) { tunique_contact_response(false, 'ページを再読み込みして、もう一度お試しください。', 403); }
    if (!empty($_POST['bot-field'])) { tunique_contact_response(false, '入力内容を確認してください。', 400); }
    $fields = array();
    foreach (array('name' => 100, 'email' => 254, 'region' => 100, 'message' => 5000, 'type' => 20) as $key => $limit) {
        $value = $_POST[$key] ?? '';
        if (!is_string($value) || strlen($value) > $limit * 4) { tunique_contact_response(false, '入力内容の長さを確認してください。', 400); }
        $value = trim(wp_unslash($value));
        if (function_exists('mb_strlen') && mb_strlen($value) > $limit) { tunique_contact_response(false, '入力内容の長さを確認してください。', 400); }
        $fields[$key] = $key === 'message' ? sanitize_textarea_field($value) : sanitize_text_field($value);
    }
    $types = tunique_contact_types();
    if (!$fields['name'] || !is_email($fields['email']) || !$fields['message'] || !isset($types[$fields['type']]) || ($_POST['consent'] ?? '') !== '1' || ($fields['type'] === 'travel' && !$fields['region'])) {
        tunique_contact_response(false, '必須項目とメールアドレス、同意を確認してください。', 400);
    }
    // Fixed recipient and sanitized Reply-To prevent header and destination injection.
    $key = 'tunique_mail_' . hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', wp_salt());
    if (get_transient($key)) { tunique_contact_response(false, '少し時間をおいてから送信してください。', 429); }
    set_transient($key, 1, 60);
    $body = 'お名前：' . $fields['name'] . "\nメール：" . $fields['email'] . "\n種別：" . $types[$fields['type']] . "\n地域：" . $fields['region'] . "\n\n" . $fields['message'] . "\n\nプライバシーポリシーに同意済み\n送信時点では予約は確定しません。";
    try {
        $sent = wp_mail(get_option('tunique_contact_recipient'), '[TUNIQUE] ' . $types[$fields['type']], $body, array('Reply-To: ' . sanitize_email($fields['email'])));
    } catch (Throwable $error) {
        $sent = false;
    }
    if (!$sent) { delete_transient($key); tunique_contact_response(false, '送信できませんでした。時間をおいてから再度お試しください。', 502); }
    tunique_contact_response(true, 'お問い合わせを送信しました。メールでの返信をお待ちください。', 200);
}
