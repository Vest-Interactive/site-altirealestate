import slick from 'slick-carousel';
import GMaps from 'gmaps';
import moment from 'moment';

function PropertyDetails($) {

	$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
	}



  var apiUrl = 'http://altirealestate.herokuapp.com/';
  //var apiUrl = 'http://localhost:6969/';

	$.ajax({
    url: apiUrl + 'propertyDetail/'+ location.pathname.replace('/listing/', '').replace('/',''),//$.urlParam('mlsid'),
    type: 'GET',
    dataType: 'json',
    crossDomain: true,
    }).done(function(data) {
      console.log(data);

      var property = data.property;

      window.document.title = 'Alti Real Estate - ' + property.address.full + ', ' + property.address.city + ' ' + property.address.state;

			var source = $("#property-detail-page-template").html();
			var template = Handlebars.compile(source);
			$('#property-details-page').html(template(data.property));


			 $('.property-slider-for').slick({
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  arrows: true,
				  fade: true,
				  asNavFor: '.property-slider-nav'
				});

				$('.property-slider-nav').slick({
				  slidesToShow: 5,
				  slidesToScroll: 1,
				  asNavFor: '.property-slider-for',
				  dots: false,
				  centerMode: true,
				  focusOnSelect: true
				});

				// Load our map too
				displayMap(data.property.geo);
				//displayWalkScore(data.property);

				displayPageContent();
    });

function displayPageContent() {
	$('#property-details-page').addClass('fadeIn');
	$('.property-realtor-block').addClass('fadeIn');
	$('.ajax-loading').addClass('hidden');
}



function displayMap(data) {

	var map = new GMaps({
	  div: '#property-map-location',
	  lat: data.lat,
	  lng: data.lng,
	  zoom: 17,
	  panControl: false,
	  zoomControl: true,
	  mapTypeControl: false,
	  scaleControl: false,
	  streetViewControl: false,
	  overviewMapControl: true,
	  scrollwheel: false
	});

	map.addMarker({
	  lat: data.lat,
	  lng: data.lng,
	  title: 'Home',
	  click: function(e) {
	   // alert('You clicked in this marker');
	  }
	});
}


function displayWalkScore(property) {
	var script = document.createElement('script');

	
	var address=property.address;

	window.ws_wsid = 'fba08f45f077442e9ccf40c63fc41985';
	window.ws_width = '100%'; 	
	window.ws_height = '444';

	window.ws_address = address.streetNumberText + ' ' + address.streetName + ', ' + address.city + ', ' + address.state;
	//window.
	//window.ws_address = '';

	//console.log(window.ws_address);

	window.ws_lat = property.geo.lat;
	window.ws_lon = property.geo.lng;

	console.log(ws_lat + ' ' + ws_lon);

	window.ws_layout = 'horizontal';


	script.type = 'text/javascript';
	script.text = "var ws_wsid = 'fba08f45f077442e9ccf40c63fc41985';		var ws_width = '600'; 	var ws_height = '444';	var ws_layout = 'vertical';	var ws_commute = 'true'; 	var ws_transit_score = 'true';	var ws_map_modules = 'all';' ";

	var html = "<div id='ws-walkscore-tile'><div id='ws-footer' style='position:absolute;top:426px;left:8px;width:588px'><form id='ws-form'><span id='ws-foottext' style='float: left;'>Score <a id='ws-a' href='https://www.redfin.com/how-walk-score-works' target='_blank'>Your Home</a>: </span><input type='text' id='ws-street' style='position:absolute;top:0px;left:170px;width:386px' /><input type='image' id='ws-go' src='//cdn2.walk.sc/2/images/tile/go-btn.gif' height='15' width='26' border='0' alt='get my Walk Score' style='position:absolute;top:0px;right:0px' /></form></div>";

	var walkscore = document.createElement('script');
	walkscore.type = 'text/javascript';
	walkscore.src = 'http://www.walkscore.com/tile/show-walkscore-tile.php'


	document.getElementById('walk-score').appendChild(script);
	$('#walk-score').html(html);
	document.getElementById('walk-score').appendChild(walkscore);
}




Handlebars.registerHelper('exterior', function(context, options) {
  var arr = context.split(',');
  var html = '';
  arr.forEach(function(e,i) {
  	html += '<li> <strong>Exterior Feature:</strong> <span>' + e + '</span></li>';
  });
  return html
});

Handlebars.registerHelper('interior', function(context, options) {
  var arr = context.split(',');
  var html = '';
  arr.forEach(function(e,i) {
  	html += '<li> <strong>Interior Feature: </strong><span>' + e + '</span></li>';
  });
  return html
});

Handlebars.registerHelper('currencyMonthly', function(price) {

	var monthlyEst = (price / 360).toFixed(0);

  return new Handlebars.SafeString(
    '$'+monthlyEst.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
});

Handlebars.registerHelper('currency', function(price) {

  return new Handlebars.SafeString(
    '$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
});


Handlebars.registerHelper('heatingFormat', function(arr) {

	arr = arr.split(',');
	var string = '';

	arr.forEach(function(el, i) {
		string += el+'<br>';
	});

  return new Handlebars.SafeString(
    string
  );
});



Handlebars.registerHelper('estMonthlyBlock', function(price, type) {

	var html = '';
	if (type=='RNT') {
		var cost = '$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		html += "<div class='block col fat monthlyEstimate'><span class='detail'>"+cost+" </span><span class='description'> Month Rent </span></div>";

		
	} else {
		var monthlyEst = (price / 360).toFixed(0);
		var cost = '$'+monthlyEst.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		html += "<div class='block col fat monthlyEstimate'><span class='detail'> "+cost+" </span><span class='description'> Est Monthly </span></div>";
		
	}

  return new Handlebars.SafeString(
    html
  );
});

Handlebars.registerHelper('listingPrice', function(price, type) {

	var html = '';
	if (type=='RNT') {
		html = "<div class='block col fat' style='min-height: 75px;'><span class='detail'></span><span class='description'> </span></div>";
	} else {
		var cost = '$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		html = "<div class='block col fat'><span class='detail'> "+cost+"</span><span class='description'> Listing Price </span></div>";

	}
	

	return new Handlebars.SafeString(
		html
	);
});

Handlebars.registerHelper('squareFeet', function(ft) {

	return new Handlebars.SafeString(
		ft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' sq. ft.'
	);
});

Handlebars.registerHelper('subType', function(arr) {

  var type = '';
  if (arr == 'SingleFamilyResidence') {
    type = 'Single Family Residence';
  } else {
    type = arr;
  }

  return new Handlebars.SafeString(
    type
  )
});

Handlebars.registerHelper('fromNow', function(time) {
  var t = new Date(Date.parse(time));
  var year = t.getFullYear();
  var month = t.getMonth()+1;
  month = (month < 10 ) ? '0'+month : month;
  
  var day = t.getDate()+1;
  day = (day < 10) ? '0'+day : day;
  t = year+''+month+''+day;

var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var firstDate = new Date(time);
var secondDate = new Date();
var diffDays = Math.ceil(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

var diff =  Math.floor(( new Date() - Date.parse(time) ) / 86400000) -1;

  return new Handlebars.SafeString(
    //t.toDateString()
   // moment(t, "YYYYMMDD").fromNow() 
   diff + ' days ago'
  );
});

}

export default PropertyDetails;