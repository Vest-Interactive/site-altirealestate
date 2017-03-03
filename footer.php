<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

    <footer class='site-footer'>
      <div class="contact-wrapper">
        <div class="grid-width block-center">
          <ul>
            <li><a href="tel:5029667325" title='Alti Real estate Telephone Number'><i class="fa fa-phone" aria-hidden="true"></i> &nbsp; (502) 966-7325</a></li>
            <li>
              <a href='mailto:info@altirealestate.com' title='Alti Real estate Email'>
                <i class="fa fa-envelope" aria-hidden="true"></i> &nbsp; info@altirealestate.com
              </a>
            </li>
            <li>
              <a href='fax:5028050843' title='Alti Real Estate Fax Number'> <i class="fa fa-fax" aria-hidden="true"></i> &nbsp; (502) 805-0843 </a>
            </li>
            <li>
              <a title='Alti Real Estate Address' href="https://www.google.com/maps/place/9405+Mill+Brook+Rd.+Louisville,+KY/@38.2661788,-85.5777413,3a,69.2y,69.94h,91.4t/data=!3m6!1e1!3m4!1skHmEcTB_DPQaVA1wBUrLsQ!2e0!7i13312!8i6656!4m2!3m1!1s0x0:0x1c2dabf362b6f276!6m1!1e1" target="_blank">
                9405 Mill Brook Rd., Louisville, KY 40223
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="grid-width block-center last-footer">
        <div class="col col-half">
          
          <a href="https://www.facebook.com/AltiRealEstateGregTaylor/" title='Alti Real Estate Facebook' target="_blank">
            <i class="fa fa-facebook" aria-hidden="true"></i>
            <span class='hidden' aria-hidden='true'>Facebook</span>
          </a>

         <a href="https://plus.google.com/u/0/116500204584497155503" title='Alti Real Estate Google +' target="_blank">
           <i class="fa fa-google-plus" aria-hidden="true"></i>
           <span class="hidden" aria-hidden='true'>Google + </span>
         </a>

         <a href="https://twitter.com/GregCTaylor" title='Alti Real Estate Twitter' target="_blank">
           <i class="fa fa-twitter" aria-hidden="true"></i>
           <span class="hidden" aria-hidden='true'>Twitter</span>
         </a>

         <a href="https://www.linkedin.com/in/greg-taylor-2131203" title='Alti Real Estate LinkedIn' target="_blank">
           <i class="fa fa-linkedin" aria-hidden="true"></i>
           <span class="hidden" aria-hidden='true'>LinkedIn</span>
         </a>

         <a href="https://www.instagram.com/gregtaylorare/?hl=en" title='Alti Real Estate Instagram' target="_blank">
           <i class="fa fa-instagram" aria-hidden="true"></i>
           <span class="hidden" aria-hidden='true'>Instagram</span>
         </a>

          <div class="copy-right-block">
            &copy; 2016 Alti Real Estate. All Rights Reserved.
          </div>

          
        </div>

        <div class="col col-half logo-footer">
          <div class='foot-img'>
            <img src="<?php bloginfo('template_directory'); ?>/images/remax-associates.png" alt="remax icon and logo" style='width: 150px'>
          </div>

          <div class='foot-img'>
            <img src="<?php bloginfo('template_directory'); ?>/images/house-logo.png" alt="House icon and logo">
          </div>

          <div class='foot-img'>
            <img src="<?php bloginfo('template_directory'); ?>/images/realtor-logo.png" alt="Realtor Information">
          </div>
          <a class='wave-logo' href='http://wave.webaim.org/about' target='_blank' title='Wave Accessibility Evaluation Tool'>
            <img src="<?php bloginfo('template_directory'); ?>/images/wave-tool.png">
          </a>
        </div>
      </div>
    </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAoR0y0rjRa7HL9E5oDrQCl8n0G7iFDfc&libraries=places&v=3.24"></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js'></script>
  <script src='/wp-content/themes/altirealestate/js/main.js'></script>
 <!--  <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.css"/>

  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-81210133-1', 'auto');
  ga('send', 'pageview');

</script>

<?php wp_footer(); ?>
</body>
</html>
