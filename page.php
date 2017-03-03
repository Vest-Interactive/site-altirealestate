<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header(); ?>

<?php
  // TO SHOW THE PAGE CONTENTS
  while ( have_posts() ) : the_post(); ?> <!--Because the_content() works only inside a WP Loop -->

          <?php the_content(); ?> <!-- Page Content -->


  <?php
  endwhile; //resetting the page loop
  wp_reset_query(); //resetting the page query
  ?>



<?php get_footer(); ?>