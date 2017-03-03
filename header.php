<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>

    <!-- <title><?php wp_title(' - Digital Marketing | Vest Advertising', true, 'right');  ?></title> -->


  <meta name="description" content="We are a team of highly certified realtors with over a decade of experience serving Kentucky and Southern Indiana.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Alti Real Estate | Certified Residential Experts">
  <meta property="og:url" content="http://altirealestate.com">
  <meta property="og:image" content="http://altirealestate.com/wp-content/themes/altirealestate/images/fb-link.jpg">

  <meta property="og:description" content="We are a team of highly certified realtors with over a decade of experience serving Kentucky and southern Indiana.">
  <meta property="og:site_name" content="Alti Real Estate | Certified Residential Experts">

  <link href="<?php bloginfo('template_directory'); ?>/favicon.ico" rel="shortcut icon">

  <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Open+Sans' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.5.9/slick-theme.css"/>
</head>

<body <?php body_class(); ?>>
 <div class='mast-head'>
      <div class='header-container'>

        <div class="left-nav">
          <a href="/">
            <div class="logo">
              <img src="<?php bloginfo('template_directory'); ?>/images/logo.png" alt="AltiRealEstate">
            </div>
          </a>
        </div>

        <div class="right-nav">
          <div class="newsletter-container">
            <!-- <span class='context'> get our newsletter </span> -->
            <div id='open-newsletterform'>
              <span>get our newsletter</span>
              &nbsp; <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </div>
            <form id='newsletter-form'>
              <label for="newsletter">get our newsletter</label>
              <input type="text" placeholder='my email address' id='newsletter' name='newsletter'>
              <button id='newsletter-btn'><i class="fa fa-chevron-right" aria-hidden="true"></i><span aria-hidden='true' class='hidden'>Submit Email </span></button>
            </form>
          </div>

          <div class="site-tagline">
            <h1>homes. simply. alti.</h1>
          </div>

          <div class="navigation">
            <nav>
              <ul>
                <li>
                  <a href='/buy' title='buy' class='buy-nav'>
                    buy
                  </a>
                </li>
                <li>
                  <a href='/sell' title='sell' class='sell-nav'>
                    sell
                  </a>
                </li>
                <li>
                  <a href='/about' title='about' class='about-nav'>
                    about
                  </a>
                </li>
                <li>
                  <a href='/team' title='team' class='team-nav'>
                    team
                  </a>
                </li>
                <li>
                  <a href='/blog' title='blog' class='blog-nav'>
                    blog
                  </a>
                </li>
                <li>
                  <a href='/resources' title='resources' class='resources-nav'>
                    resources
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>

      </div>
    </div>

