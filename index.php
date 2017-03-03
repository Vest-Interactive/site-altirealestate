<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header(); ?>


<?php 
	$first = true;

	if ( have_posts() ) {

		if ( is_home() && ! is_front_page() ) {


		} else {
			// show none
		}

		

			



	}


?>

<div class="page-navigation-title">
		<div class="grid-width block-center">
			<h1> blog </h1>
		</div>
	</div>


<div id="blog-archive">
	<section class="full-size page-wrapper">
		<section class="content-container">
			<ul class="row full blog-archive-grid" id='news-tiles-container'>




<?php while ( have_posts() ) : the_post(); ?>

	<?php	if ($first) : ?>
		
		<li class="featured col-lg-12">
			<div class='news-post'>
				
				<article class="col-sm-12 col-lg-12 row">
					<div class="image-wrapper col-sm-12 col-lg-5 col-md-5">
						<div class="lazyImage">
							<!-- <img src="images/blog/thumbnail1.jpg" alt=""> -->
							<?php echo get_the_post_thumbnail(); ?>
						</div>
					</div>

					<div class="text-wrapper col-sm-12 col-md-6 col-lg-6">
						<span class="category">
							<span class="published-date"><?php echo get_the_date(); ?></span>
							<span class="dot">&nbsp;•&nbsp;</span>
							<span class="label">News</span>
						</span>
						<h2><?php echo get_the_title(); ?></h2>
						<p><?php echo get_field('sub_heading'); ?></p>
						<a href='<?php echo get_permalink(); ?>' class='cta'> read the article </a>
					</div>
				</article>

			</div>
		</li>

	<?php $first = false;
	else : ?>


<li class="small col-lg-6 ">
	<div class='news-post'>

		<article class="col-sm-12">
			<div class="text-wrapper col-sm-12">
				<span class="category">
					<span class="published-date"><?php echo get_the_date(); ?></span>
					<span class="dot">&nbsp;•&nbsp;</span>
					<span class="label">News</span>
				</span>
				<h2><?php echo truncate(get_the_title(), 26); ?></h2>
				<p><?php echo get_field('sub_heading'); ?></p>
				<a href='<?php echo get_permalink(); ?>'  class='cta'> read the article </a>
			</div>
		</article>

	</div>
</li>



<?php 
endif;
endwhile; 


function truncate($string, $length, $dots = "...") {
	return (strlen($string) > $length) ? substr($string, 0, $length - strlen($dots)) . $dots : $string;
}

?>



				<!-- Block List -->
<!-- 				<li class="news-post small col-lg-6">
					<article class="col-sm-12">
						<div class="text-wrapper col-sm-12">
							<span class="category">
								<span class="published-date">June 13, 2016</span>
								<span class="dot">&nbsp;•&nbsp;</span>
								<span class="label">News</span>
							</span>
							<h2>Title of the Blog Article</h2>
							<p>The first block of text from the actual blog post.</p>
							<span class='cta'> read the article </a>
						</div>
					</article>
				</li>

				<li class="news-post small col-lg-6 bordered">
					<article class="col-sm-12">
						<div class="text-wrapper col-sm-12">
							<span class="category">
								<span class="published-date">June 13, 2016</span>
								<span class="dot">&nbsp;•&nbsp;</span>
								<span class="label">News</span>
							</span>
							<h2>Title of the Blog Article</h2>
							<p>The first block of text from the actual blog post.</p>
							<span class='cta'> read the article </a>
						</div>
					</article>
				</li>
 -->

			</ul>
		</section>
	</section>

</div>



<?php get_footer(); ?>
