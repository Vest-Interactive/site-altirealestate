<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header(); ?>

		<?php
		while ( have_posts() ) : the_post(); 
	
			$meta = get_field('sub_heading');
			$title = get_the_title();

			$content = apply_filters( 'the_content', get_the_content() );
		  $content = str_replace( ']]>', ']]&gt;', $content );

		  $prev_post = get_previous_post();
		  if (!empty ($prev_post  )) {
		  	$prevTitle = $prev_post->post_title;
		  	$prevTitle = truncate($prevTitle, 26);
		  	$prevMeta = get_field('sub_heading', $prev_post->ID);
		  	$prevLink = get_permalink($prev_post->ID);
		  	$prevHTML = '';
		  	$prevHTML .=  '<li class="news-post small col-lg-6">
					<article class="col-sm-12">
						<div class="text-wrapper col-sm-12">
							<span class="category">
								<span class="label">News</span>
							</span>
							<h2>'.$prevTitle.'</h2>
							<p> &nbsp; </p>
							<a href="'.$prevLink.'" class="cta"> read the article </a>
						</div>
					</article>
				</li>';
		  }

		  $next_post = get_next_post();
		  if (!empty ( $next_post )) {


		  	$nextTitle = $next_post->post_title;
		  	$nextTitle = truncate($nextTitle, 26);

		  	$nextMeta = get_field('sub_heading', $next_post->ID); //get_field('sub_heading');
		  	$nextLink = get_permalink($next_post->ID);
		  	$nextHTML = '';
		  	$nextHTML .= '<li class="news-post small col-lg-6 bordered">
					<article class="col-sm-12">
						<div class="text-wrapper col-sm-12">
							<span class="category">
								<span class="label">News</span>
							</span>
							<h2>'.$nextTitle.'</h2>
							<p>'.$nextMeta.'</p>
							<a href="'.$nextLink.'" class="cta"> read the article </a>
						</div>
					</article>
				</li>';
		  }

		  	// $nextTitle = '';
		  	// $nextMeta = '';
		  	// $nextLink = '';

		  	// $prevTitle = '';
		  	// $prevMeta = '';
		  	// $prevLink = '';



		  $adjacentPosts = '';
		  if (!empty ( $prev_post) && !empty($next_post)) {		  	
		  	$adjacentPosts .= $prevHTML.' '.$nextHTML;
		  } elseif (!empty( $prev_post) && empty($next_post)) {
		  	
		  	$adjacentPosts .= '<li class="news-post small col-lg-12">
					<article class="col-sm-12">
						<div class="text-wrapper col-sm-12" style="text-align: center;">
							<span class="category">
								<span class="label">News</span>
							</span>
							<h2>'.$prevTitle.'</h2>
							<p>'.$prevMeta.'</p>
							<a href="'.$prevLink.'" class="cta"> read the article </a>
						</div>
					</article>
				</li>';
		  } else {
		  
		  	$adjacentPosts .= '<li class="news-post small col-lg-12">
					<article class="col-sm-12">
						<div class="text-wrapper col-sm-12" style="text-align: center;">
							<span class="category">
								<span class="label">News</span>
							</span>
							<h2>'.$nextTitle.'</h2>
							<p>'.$nextMeta.'</p>
							<a href="'.$nextLink.'" class="cta"> read the article </a>
						</div>
					</article>
				</li>';
		  }

		endwhile; 

		function truncate($string, $length, $dots = "...") {
    	return (strlen($string) > $length) ? substr($string, 0, $length - strlen($dots)) . $dots : $string;
		}

?>

<div id="blog-single">

	<section class="full-size page-wrapper">
		<section class="content-container">



			<article id='single-blog-article' class='row full'>
				<header>
					<h1><?php echo $title; ?></h1>
					<p> <?php echo get_the_date(); ?> </p>
					<div class='sub-header'>
						<span><?php echo $meta; ?></span>
					</div>

					<section class="article-container">
						<?php echo $content; ?>
						<!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum scelerisque ante, et feugiat justo aliquet non. Cras eget feugiat diam, at egestas turpis. Donec iaculis cursus enim non condimentum. Ut nisi leo, semper ut tortor eu, bibendum viverra tortor. Morbi sit amet ullamcorper libero, nec ornare dui. Vivamus risus odio, venenatis at molestie nec, pellentesque non justo. Integer vestibulum ante enim, sed egestas orci cursus sit amet. Proin malesuada euismod feugiat. Nunc ut dolor bibendum, tristique augue in, convallis augue. In aliquam nibh ac justo iaculis venenatis. Donec vulputate hendrerit sem, sed suscipit libero maximus at. Aenean porttitor leo ac diam vulputate maximus. Sed sit amet hendrerit tellus.</p>

						<p>Sed placerat dui vestibulum imperdiet imperdiet. Vivamus aliquam massa vel maximus mattis. Donec ullamcorper eleifend ipsum at dictum. Aenean quis diam nisi. Sed interdum tellus dolor, nec condimentum ligula auctor quis. Vestibulum dictum tristique lacus ac vulputate. Cras porttitor elit vitae velit tincidunt rhoncus. Cras sit amet varius nisl, sit amet viverra odio. Vivamus tempus quam vel lectus vehicula, eu imperdiet magna interdum.</p>

						<p>Nam vel dictum lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis et libero eros. Cras lorem nunc, pretium vel neque eget, ornare cursus turpis. Aliquam urna est, hendrerit eget pharetra tristique, consequat in dolor. Proin et metus nisi. Sed elit augue, laoreet at semper et, tempor vel libero. Fusce tincidunt fringilla fermentum. Sed sollicitudin nulla felis, vel feugiat mauris vulputate facilisis. Fusce commodo tortor risus, vel congue elit pharetra quis.</p>

						<p>Etiam posuere leo sed orci facilisis, non varius lorem scelerisque. Donec viverra vitae orci quis lobortis. Duis vitae tristique arcu. Pellentesque condimentum, diam ac porta ullamcorper, mauris risus lobortis sem, sit amet pulvinar nulla neque eu neque. Fusce vehicula facilisis nisi, eu finibus orci imperdiet a. Nulla id leo tellus. Ut id ante eu ipsum mollis fermentum ac at ipsum. Donec porttitor nulla nec lacus accumsan, eget interdum dolor finibus. Morbi et tortor mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

						<p>Aliquam elit neque, dictum et consequat vitae, congue vulputate nunc. Praesent volutpat sem quis iaculis sagittis. Duis eget dui sit amet erat aliquet congue a nec purus. Vestibulum in congue justo, nec euismod metus. Pellentesque nec ipsum eu nisi imperdiet congue. Proin vitae aliquam urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> -->
					</section>
				</header>
			</article>

		

			<ul class="row full" id='news-tiles-container'>
				<!-- Block List -->
				<?php echo $adjacentPosts; ?>
				
			</ul>
		</section>
	</section>

</div>




























<?php get_footer(); ?>
