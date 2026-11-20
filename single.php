<?php
if (!defined('ABSPATH')) { exit; }
get_header(); while (have_posts()) { the_post(); ?>
<article class="wrap column-article">
<nav aria-label="パンくずリスト" class="small"><a href="<?php echo esc_url(home_url('/')); ?>">HOME</a> / <a href="<?php echo esc_url(home_url('/columns/')); ?>">コラム</a> / <?php echo esc_html(tunique_category()); ?></nav>
<header><p class="eyebrow"><?php echo esc_html(tunique_category()); ?> / COLUMN</p><h1><?php the_title(); ?></h1>
<p class="small">執筆：<a href="<?php echo esc_url(home_url('/about/')); ?>"><?php echo esc_html(get_post_meta(get_the_ID(), '_tunique_author', true) ?: get_the_author()); ?></a> · 公開 <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('Y-m-d')); ?></time></p></header>
<?php if (has_post_thumbnail()) { ?><div class="column-hero-image"><?php the_post_thumbnail('full'); ?></div><?php }
$credit = get_post_meta(get_the_ID(), '_tunique_credit', true);
if ($credit) { echo '<p class="small column-image-credit">' . esc_html($credit) . '</p>'; } ?>
<div class="column-prose"><?php the_content(); wp_link_pages(); ?></div>
<aside class="column-related"><h2>フィッティングについて、もう少し。</h2><a href="<?php echo esc_url(home_url('/bike-fitting/')); ?>">TUNIQUE BIKE FITTINGを知る ↗</a></aside>
<a href="<?php echo esc_url(home_url('/columns/')); ?>">← コラム一覧へ戻る</a></article>
<section class="contact-band"><div class="wrap"><p class="eyebrow">LET’S FIND YOUR OWN.</p><div class="contact-band-row"><h2>あなたに合う答えを、<br>一緒に見つけよう。</h2><a class="button button-light" href="<?php echo esc_url(home_url('/contact/?type=road')); ?>">フィッティングを相談する ↗</a></div></div></section>
<?php } get_footer(); ?>
