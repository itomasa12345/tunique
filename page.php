<?php
if (!defined('ABSPATH')) { exit; }
get_header();
while (have_posts()) { the_post();
    if (get_post_meta(get_the_ID(), '_tunique_import', true)) { the_content(); }
    else { echo '<article class="wrap section column-prose"><h1>' . esc_html(get_the_title()) . '</h1>'; the_content(); echo '</article>'; }
}
get_footer();
