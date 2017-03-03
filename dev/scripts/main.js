import jQuery from 'jquery';

import Sell from './Sell';
import PropertyDetails from './PropertyDetails';
import Site from './Site';
import Email from './Email';
import About from './About';

// Nav Underline
var route = window.location.pathname;
if ( route === '/buy/' || route === '/sell/' || route === '/about/' || route === '/team/' || route === '/blog/' || route === '/resources/' ) {
	var navPage = window.location.pathname.replace('/','').replace('/', '');
	$('.'+navPage+'-nav').css('border-bottom', '2px solid #990099');
}

// Newsletter open ..
$('#open-newsletterform').on('click', function(e) {
	$(this).fadeOut(500);
	setTimeout(function() {
		$('#newsletter-form').fadeIn();
	}, 480);
	
});

Email(jQuery);


//GMap(jQuery);
//if (window.location.pathname == '/property-details.html' || document.location.pathname == '/property-details/') {
if (window.location.pathname.search('listing') == 1) {
PropertyDetails(jQuery);
}

if (window.location.pathname == '/sell.html' || document.location.pathname == '/sell/') {
	Sell(jQuery);
}

//if (window.location.pathname == '/property-search.html' || document.location.pathname == '/property-search/') {
if (window.location.pathname == '/buy.html' || document.location.pathname == '/buy/') {
	Site(jQuery);	
}

if (window.location.pathname == '/about.html' || document.location.pathname == '/about/') {
	About(jQuery);	
}



