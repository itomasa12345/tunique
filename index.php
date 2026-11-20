<?php
if (!defined('ABSPATH')) { exit; }
get_header(); ?>
<section class="wrap section"><p class="eyebrow">COLUMN</p><h1><?php echo is_archive() ? esc_html(get_the_archive_title()) : 'コラム'; ?></h1>
<?php while (have_posts()) { the_post(); ?><article class="column-prose"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article><?php } the_posts_pagination(); ?></section>
<?php get_footer(); ?>
