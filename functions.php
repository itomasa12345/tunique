<?php
if (!defined('ABSPATH')) { exit; }
require_once __DIR__ . '/inc/setup.php';
require_once __DIR__ . '/inc/contact.php';
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('tunique-site', get_theme_file_uri('/assets/site.css'), array(), '1.0.0');
    wp_enqueue_style('tunique-wp', get_theme_file_uri('/assets/wordpress.css'), array('tunique-site'), '1.0.0');
    wp_enqueue_script('tunique-site', get_theme_file_uri('/assets/site.js'), array(), '1.0.0', true);
});
// Local paths are resolved at render time: staging links stay inside its subdirectory.
function tunique_markup($markup) {
    return preg_replace_callback('~\b(href|src)="(/[^"<>]*)"~i', function ($m) {
        if (strpos($m[2], '//') === 0) { return $m[0]; }
        $path = html_entity_decode($m[2], ENT_QUOTES, 'UTF-8');
        $url = preg_match('~^/(images|brand)/~', $path)
            ? get_theme_file_uri('/assets' . $path) : home_url($path);
        return $m[1] . '="' . esc_url($url) . '"';
    }, $markup);
}
add_filter('the_content', 'tunique_markup', 9);
// The imported layouts already contain explicit paragraphs; native new posts use WP formatting.
remove_filter('the_content', 'wpautop');
add_filter('the_content', function ($content) {
    return get_post_meta(get_the_ID(), '_tunique_import', true) ? $content : wpautop($content);
}, 10);
function tunique_cards($atts) {
    $atts = shortcode_atts(array('limit' => 12, 'paged' => 1), $atts);
    $query = new WP_Query(array('post_type' => 'post', 'post_status' => 'publish', 'category_name' => 'tunique-column',
        'posts_per_page' => min(50, max(1, intval($atts['limit']))), 'paged' => max(1, intval($atts['paged'])),
        'orderby' => array('date' => 'DESC', 'ID' => 'DESC')));
    ob_start();
    if ($query->have_posts()) {
        echo '<div class="column-grid">';
        while ($query->have_posts()) { $query->the_post(); ?>
            <article class="column-card"><a href="<?php the_permalink(); ?>">
                <div class="column-card-image<?php echo get_post_meta(get_the_ID(), '_tunique_full_frame', true) ? ' column-image-full-frame' : ''; ?>">
                    <?php the_post_thumbnail('large', array('loading' => 'lazy')); ?>
                </div>
                <div class="column-card-meta"><span><?php echo esc_html(tunique_category()); ?></span><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y-m-d')); ?></time></div>
                <h3><?php the_title(); ?></h3><p><?php echo esc_html(get_the_excerpt()); ?></p>
                <span class="text-link">記事を読む <span aria-hidden="true">↗</span></span>
            </a></article>
        <?php }
        echo '</div>';
        if (intval($atts['limit']) !== 3) {
            echo '<nav class="tunique-pagination" aria-label="コラムのページ">' . wp_kses_post(paginate_links(array(
                'base' => add_query_arg('column_page', '%#%', home_url('/columns/')),
                'format' => '', 'current' => max(1, intval($atts['paged'])), 'total' => $query->max_num_pages)) ?: '') . '</nav>';
        }
    } else { echo '<p>コラムは準備中です。</p>'; }
    wp_reset_postdata();
    return ob_get_clean();
}
function tunique_category() {
    $terms = get_the_category();
    foreach ($terms as $term) { if ($term->slug !== 'tunique-column') { return $term->name; } }
    return 'コラム';
}
add_shortcode('tunique_columns', function ($atts) {
    $atts = is_array($atts) ? $atts : array();
    if (empty($atts['limit'])) { $atts['paged'] = isset($_GET['column_page']) ? max(1, intval($_GET['column_page'])) : 1; }
    return tunique_cards($atts);
});
add_filter('excerpt_length', function () { return 60; });
add_action('wp_head', function () {
    if (is_404() || is_search() || is_archive() || is_home()) { return; }
    $id = get_queried_object_id();
    $description = get_post_meta($id, '_tunique_description', true);
    if (!$description && is_singular('post')) { $description = get_the_excerpt($id); }
    if (!$description) { $description = get_bloginfo('description'); }
    $image = is_singular('post') ? get_the_post_thumbnail_url($id, 'full') : get_theme_file_uri('/assets/brand/tunique-logo.png');
    $url = is_front_page() ? home_url('/') : get_permalink($id);
    echo '<meta name="description" content="' . esc_attr(wp_strip_all_tags($description)) . '">';
    foreach (array('og:title' => wp_get_document_title(), 'og:description' => wp_strip_all_tags($description), 'og:url' => $url,
        'og:type' => is_singular('post') ? 'article' : 'website', 'og:site_name' => 'TUNIQUE', 'og:locale' => 'ja_JP', 'og:image' => $image) as $key => $value) {
        if ($value) { echo '<meta property="' . esc_attr($key) . '" content="' . esc_attr($value) . '">'; }
    }
    echo '<meta name="twitter:card" content="summary_large_image">';
    if (is_singular('post')) {
        $schema = array('@context' => 'https://schema.org', '@type' => 'Article', 'headline' => get_the_title($id),
            'description' => wp_strip_all_tags($description), 'image' => $image, 'mainEntityOfPage' => $url,
            'datePublished' => get_the_date('c', $id), 'dateModified' => get_the_modified_date('c', $id),
            'author' => array('@type' => 'Person', 'name' => get_post_meta($id, '_tunique_author', true) ?: get_the_author_meta('display_name', get_post_field('post_author', $id)), 'url' => home_url('/about/')));
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) . '</script>';
    }
});
