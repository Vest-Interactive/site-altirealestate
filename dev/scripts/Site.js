import GMaps from 'gmaps';
import slick from 'slick-carousel';
import NProgress from 'nprogress';
import moment from 'moment';
import vendor from './vendor';

import modal from './modal.min';


function Site($, params) {

	//let options = params || {};

	/*
	 * Get URL Parameter by Name and return the value
	*/
	function getParameterByName(name) {
	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}



  /*
   *  GMAPS Plugin - https://hpneo.github.io/gmaps/
   */

  // Remove Marker from the Map with a specific type
  GMaps.prototype.removeMarkersOfType = function (poi_type) {
    // for each real marker of this type
    $.each(realMarkers[poi_type],function(index, obj){
      // remove the marker
      map.removeMarker(obj);
    });
    // clear markers of this type
    realMarkers[poi_type]=[];
  }


GMaps.prototype.addMarkersOfType = function (poi_type) {
    // save the relevant map
    var theMap = this.map;
    listingInBounds =0;

    realMarkers[poi_type]=[];
    // for each Gmaps marker
    // TODO: This is the array we need for order: gMarkers
    $.each(gMarkers[poi_type],function(index, obj){
        // add the marker
      if(polygons.length > 0){
        listingsDisplayed = 0;
        for(var i = 0; i < polygons.length; i++) {
          if(map.checkGeofence(obj.lat,obj.lng,polygons[i])){
            var marker = map.addMarker(obj);
            // save it as real marker
            realMarkers[poi_type].push(marker);
            var currentIndex = (realMarkers[poi_type].length - 1);

            // Add div to results Side bar
            if (poi_type =='listings'){
            numOfListings = gMarkers[poi_type].length;
            // Still gives old value
            var j = favoratedListingsIDs.indexOf(obj.postID);
            if(j == -1) {
              var activeClass = "" ;
            }else{
             var activeClass = "stared" ;
            }
            if(listingsInListDiv < 25){
            // FIXME
             // appendList(obj.postID);
             listingsInListDiv++;
             listingsDisplayed++;
             //$('.map-search-results-count').html(listingsDisplayed+" Listings Found.");
             //console.log(`Number of Listings Found : ${listingsDisplayed}`);
            }
            }
          }
        }
      }
       else{
          var marker = map.addMarker(obj);
          // save it as real marker
          realMarkers[poi_type].push(marker);
          // Add div to results Side bar
          if (poi_type =='listings'){
            numOfListings = gMarkers[poi_type].length;
            var j = favoratedListingsIDs.indexOf(obj.postID);
            if(j == -1) {
              activeClass = "" ;
            }else{
              activeClass = "stared" ;
            }
            if(listingsInListDiv < 15){
              // FIXME
             // appendList(obj.postID);
             listingsInListDiv ++;
            }
          }

       };


    if(iWindow == obj.postID){
      curentListing = obj;
      updateInfoWindow(obj.postID);
      listingInBounds = 1;
      }
    });

//setResultsHeight();

  if (oID != null || aID != null ){
     map.fitZoom();
  };
  $('#loadingDiv').hide();

 if (iWindow!=null&&listingInBounds!=1){
      iWindow = null;
      curentListing = null;
      $('#over-map').hide();
      updateJSVars();
  }
}


	var siteUrl = '/wp-content/themes/altirealestate';
	
	var gMarkers = []; // Contain the difference between a listing and a school type
	window.realMarkers = []; // These contain the markers on the current Map
	var polygonAry = []; // List the current variables of polygon points
	window.map = null; // Reset and clear the map global variable
	var radius = 0; // Holds the radius for positioning locations nearby to center
	var imageUrl = siteUrl+'/images/ra-marker-purple-home@2x-1.png';
	var imageSchoolUrl = siteUrl+'/wp-content/themes/bones-master/library/images/marker-school.png';
	var imageUrlCluster = siteUrl+'/wp-content/themes/bones-master/library/images/marker-cluster.png';
	var imageUrlSelected = siteUrl+'/images/ra-marker-green-home@2x.png';
	var imageUrlStarted = siteUrl+'/wp-content/themes/bones-master/library/images/marker-star.png';
	var imageUrlStartedSelected = 'https://www.realtyaustin.com/img/map/ra-marker-red-home@2x.png';
	var markers_data = []; // Results of a fetch are stored inside this for the icon on the map
	var markers_schools_data = []; // Results of a fetch for a school are stored in here

	// Variable holders for the maps borders, used to help fetch new listings based on window size
	var mapCurrentBounds = null;
	var southWest = null;
	var northEast = null;
	var boundsDistance = null;

	var curentListing = null; // placeholder for the pages current selected listing in focus

	var starMarkImg = new google.maps.MarkerImage(imageUrlStarted);
	var starSelectedMarkImg = new google.maps.MarkerImage(imageUrlStartedSelected);
	var altMarkImg=new google.maps.MarkerImage(imageUrlSelected);
	var markImg=new google.maps.MarkerImage(imageUrl);

	var timer =null; // hold the pages time it takes to do things
	var xhr = null; // attempt to stop xhr that is in progress?
	var listingsDisplayed =0;
	var listingsInListDiv = 0;
	var removePolygonbutton = 0;
	var numOfListings = 0;
  //var marketPlace = 'lou';




//var currentMapZoom = parseInt(getParameterByName('zoom'));
//if(currentMapZoom=='NaN'){currentMapZoom=4;};
var currentMapZoom = null;
if(getParameterByName('zoom')===null) {
  currentMapZoom = 14;
} else {
  currentMapZoom = parseInt(getParameterByName('zoom'));
}

var marketPlace = getParameterByName('market');
if (marketPlace == null) { marketPlace = 'lou'; }

var currentMapLat = getParameterByName('lat');
if(currentMapLat==null){currentMapLat=38.211074;};
var currentMapLng = getParameterByName('lng');
if(currentMapLng==null){currentMapLng=-85.734558;};
var price_min = getParameterByName('price_min');
if(price_min==null){price_min=0;};
var price_max = getParameterByName('price_max');
if(price_max==null){price_max=0;};
var beds = getParameterByName('beds');
if(beds==null){beds=0;};


var baths = getParameterByName('baths');
if(baths==null){baths=0;};
var sqft_min = getParameterByName('sqft_min');
if(sqft_min==null){sqft_min=0;};
var sqft_max = getParameterByName('sqft_max');
if(sqft_max==null){sqft_max=0;};
//var lot_size_min = getParameterByName('lot_size_min') === '' ? 0 : getParameterByName('lot_size_min');
//var lot_size_min = '';
//if(lot_size_min==null){lot_size_min=0;};
var lot_size_max = getParameterByName('lot_size_max');
if(lot_size_max==null){lot_size_max=0;};
var year_built_min = getParameterByName('year_built_min');
if(year_built_min==null){year_built_min=0;};
var year_built_max = getParameterByName('year_built_max');
if(year_built_max==null){year_built_max=0;};
var keywords = getParameterByName('keywords'); //// stays null if not set
if(keywords!=null){keywords=keywords.replace(/-/g, ' ');};
var gsCodeConcat = getParameterByName('gscode'); //// stays null if not set
if(gsCodeConcat!=null){var gsCode = gsCodeConcat.split('');}else{var gsCode = new Array();};
var ptCodeConcat = getParameterByName('ptcode'); //// stays null if not set
if(ptCodeConcat!=null){var ptCode = ptCodeConcat.split('');}else{var ptCode = new Array();};
var sortBy = getParameterByName('sortBy');
if(sortBy==null){sortBy="desc";};

// var residential = $('#residential:checked').val(),
//     rental = $('#rental:checked').val(),
//     multifamily = $('#multifamily:checked').val(),
//     condominium = $('#condominium:checked').val(),
//     commercial = $('#commercial:checked').val(),
//     land = $('#land:checked').val();

var residential = getParameterByName('residential');
//if(residential==null) {residential=''; }
//if(residential==null) {residential}
var rental = getParameterByName('rental');

var condominium = getParameterByName('condominium');
//if(condominium==null) {condominium='';}

if( residential== null && (rental != null || condominium != null) ) {
  $('#residential').attr('checked', false);
}

var lot_size_min = 0;

var oID = getParameterByName('oID');
var aID = getParameterByName('aID');

var geo = getParameterByName('geo');
var geoTermID = getParameterByName('geoTermID');
var polygon = null;
var polygons = new Array();
var mapDisabled = 0;
var disableCircle;
var favoratedListingsIDs = [];
var move = null;
var poly = getParameterByName('poly');


var addressSearched = getParameterByName('address');
var iWindow = getParameterByName('iWindow'); // Modal Pop UP
var listingInBounds = 0; // is our listing in the map
var sidebarOffset = 0; // how many listings deep are we?

//var apiUrl = 'http://api.maxavenue.com/api/v1/';

/**
 *	Initiate our Map
 **/
map = new GMaps({
  div: '#map-search',
  lat: currentMapLat,
  lng: currentMapLng,
  zoom: currentMapZoom,
  panControl: false,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  scrollwheel: false,
  streetViewControl: false,
  overviewMapControl: false,
  center_changed:function(e){      
    toggleLoader(true);
  },
  bounds_changed:function(e){
    toggleLoader(true);
  },
  click:function(e){
    console.log(e);
  },
  zoom_changed: function(e){
    sidebarOffset = 0;
		toggleLoader(true);
  },
  dragend: function(e){
		toggleLoader(true);
  },
  idle: function (e) {
		toggleLoader(true);
    // When the Map isn't moving we update our Map Listing
    $('.sidebar-loader').fadeIn();
      cropListingsToGeo();  
    
   	
  },
});

// Toggle our loadingDiv
var $loadingEl = $('#loading');

function toggleLoader(state) {
	if (state) {
		$loadingEl.show();
	} else {
		$loadingEl.hide();
	}
}

/***
 * 	cropListingsToGeo()
 *
 *	desc: Apply our Listings to the Map
 *	- We check to see if the map is disabled first.
 ***/
function cropListingsToGeo() {
  if(mapDisabled == 0){
  	// Not sure the setTimeout is for at the moment... but adding it in later could prevent something?
      updateGetListingsJson();
  }
}

/***
 *	updateGetListingsJson
 *
 *	desc: FETCH - Gather our json of listings, and sidebar values
 *	- Talk to our API and get the results that are inside our map boundaries.
 ***/
  var apiUrl = 'https://altirealestate.herokuapp.com/';
  //var apiUrl = 'http://localhost:6969/';

  var requestPending = 0;

function updateGetListingsJson(){
	
  $('.over-map').hide(); // this is our modal... we remove it everytime a listing is updated
  //updateJSVars();
  updateSearchParameters();
  $('#loadingDiv').show();

  // Change Listeings Found Count and Sidebar
  $('#listings-count').text('');
  $('#property-search-results').html(
      '<div class="no-results-sidebar-container">'+
      '<p> Finding the perfect home for you ...</p>'+
      '</div>'
    );

  // TODO: We should only remove listings if they aren't in the new batch because of filters, not for changing viewport
  map.removeMarkersOfType('listings');

  console.log(' Pending : '+requestPending);
  if (requestPending != 1) {

    requestPending = 1;

  $.ajax({
    url: apiUrl + 'listing1',
    type: 'GET',
    data: {
      geo:geo,
      price_min:price_min,
      price_max:price_max,
      baths:baths,
      beds:beds,
      sqft_min:sqft_min,
      sqft_max:sqft_max,

      residential: residential,
      rental: rental,
      //multifamily: multifamily,
      condominium: condominium,
      //commercial: commercial,
      //land: land,
      market : marketPlace,


     year_built_min: year_built_min,
      northEastLat: map.getBounds().getNorthEast().lat(),
      northEastLng: map.getBounds().getNorthEast().lng(),
      southWestLat: map.getBounds().getSouthWest().lat(),
      southWestLng: map.getBounds().getSouthWest().lng(),
      sortBy:sortBy
    },
    dataType: 'json',
    crossDomain: true,
    }).done(function(data) {
      var currentMarket = $('#markets').find(':selected').val();

      if (data.sidebar.length === 0) {
        $('#listings-count').text('');

        marketPlace = currentMarket;


        $('#property-search-results').html(
          '<div class="no-results-sidebar-container">'+
          '<h1> We could not find any results for this area </h1>'+
          '<p> Your current market is <u>'+currentMarket+'</u>, please adjust your search filters, try a new location or change your market in the menu above.</p>'+
          '</div>'
        );
        $('.sidebar-loader').fadeOut();
        setUrlParams();

        requestPending = 0;
      } else {
       
        marketPlace = currentMarket;

       // console.log(data);
        window.data = data;

        console.log(data);
        newLoadResults(data.listings);
        updatePropertySidebar(data);
        setUrlParams();

        $('.sidebar-loader').fadeOut();
        requestPending = 0;


      }
      // TODO: Here's one
       // getNearbyGeo();
    });

  }
} // end update Get Listings JSON

////////////////////////////////////////// Update the Sidebar in Property Seach
function updatePropertySidebar(data) {
  // Pass our Data to our Handblebars
  var source = $("#property-search-sidebar-template").html();
  var template = Handlebars.compile(source);
  $('#property-search-results').html(template(data));

}

var mouseDownDraw;
var simplePoly;
var polyUrl;

////////////////////////// Draw Button
map.addControl({
  position: 'TOP_RIGHT',
  content: '<i class="fa fa-pencil" aria-hidden="true"></i> &nbsp; Draw Search',
   classes: 'draw-search-btn btn',
  style: {
    margin: '60px 20px 20px 20px',
    padding: '10px',
    backgroundColor: '#990099',
    color: '#fff',
    minWidth: '100px',
    textAlign: 'center',
    fontSize: '18px'
  },
  events: {
    click: function(e){
      if (mapDisabled==1) {
        if(polygons.length>=1){
          addRemovePolygonButton()
        }
        else{
          map.controls.pop();
        }
        google.maps.event.removeListener(move);
        google.maps.event.removeListener(mouseDownDraw);
        $(".draw-search-btn").html('<i class="fa fa-pencil" aria-hidden="true"></i> &nbsp; Draw Search');
        $(".draw-search-btn").removeClass( "waiting-click");
        updateGetListingsJson();
        mapDisabled = 0;
        enable();
      }else{
        mapDisabled = 1;
        disable();
       // map.removeMarkersOfType('schools');
        map.removeMarkersOfType('listings');
        $(".draw-search-btn").addClass( "waiting-click");
        $(".draw-search-btn").text("Done");
        mouseDownDraw = google.maps.event.addDomListener(map.map.getDiv(),'mousedown',function(e){
          drawFreeHand();
        });
      }
    }
  }
});




if (poly != null) {

  // desc: Used to maintain points on a polygon that can be passed to map to be drawn
  var polygonAryPoly = []
  
  // ALMOST FIXME
  addRemovePolygonButton();

  //console.log(poly);

  polyString = poly.substr(1)

  // remove last character
  polyString.substring(0, polyString.length - 1);


  var polyString = poly.substr(1)
  //
  // // remove last character
  // polyString.substring(0, polyString.length - 1);

  // Turn each set into a collective array
  // var polyArray = polyString.split("),(")

  altString = polyString.replace(/\),\(/g , "|");

  points = altString.split("|")

  for (i = 0; i < points.length; i++) {
    console.log(points[i]);
    currentPoint = points[i].split(",");
    polygonAryPoly.push([currentPoint[1],currentPoint[0]]);
  }

  polygon = map.drawPolygon({
    paths: polygonAryPoly, // pre-defined polygon shape
    strokeColor: '#DC73DC',
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: '#DC73DC',
    fillOpacity: 0.4,
  });

  polygons.push(polygon);

  map.setZoom(Number(currentMapZoom));
    cropListingsToGeo();
}



///////////////////////////////Add The Remove Shape Button
function addRemovePolygonButton(){
  if (removePolygonbutton == 1){
     map.map.controls[google.maps.ControlPosition.TOP_RIGHT].pop();
  }
  removePolygonbutton = 1;
  map.addControl({
      position: 'TOP_RIGHT',
      content: 'Remove Shape',
      classes: 'remove-polygons-btn btn',
      style: {
        margin: '20px 0',
        padding: '10px',
        backgroundColor: '#fff',
        color: '#000',
        minWidth: '100px',
        textAlign: 'center',
        visibility: 'hidden',
        fontSize: '18px'
      },
      events: {
        click: function(){
          clearPolygons();
        }
      }
  });
}

  ////////////////////////// Zoom In Button
  map.addControl({
    position: 'RIGHT_TOP',
    content: '<i class="fa fa-search-plus" aria-hidden="true"></i>',
     classes: 'zoom-in-btn btn',
     style: {
        margin: '20px 20px 5px 20px',
        padding: '10px',
        backgroundColor: '#790179',
        color: '#fff',
        //minWidth: '100px',
        textAlign: 'center',
        visibility: 'hidden',
        fontSize: '18px'
      },
    events: {
      click: function(){
             map.zoomIn();
      }
    }
  });
  ////////////////////////// Zoom Out Button
  map.addControl({
    position: 'RIGHT_TOP',
    content: '<i class="fa fa-search-minus" aria-hidden="true"></i>',
     classes: 'zoom-out-btn btn',
      style: {
        margin: '0 20px 20px 20px',
        padding: '10px',
        backgroundColor: '#790179',
        color: '#fff',
        //minWidth: '100px',
        textAlign: 'center',
        visibility: 'hidden',
        fontSize: '18px'
      },
    events: {
      click: function(){
        map.zoomOut();
      }
    }
  });




/////////////////////////////////////////////////////////Disable Map Controls
function disable(){
  if(xhr!=null){xhr.abort();};
  $('.zoom-out-btn').hide();
  $('.zoom-in-btn').hide();
  $('.over-map').hide();
    $('.schools-btn').hide();
   if (removePolygonbutton == 1){
     $('.remove-polygons-btn').hide();
   }

disableCircle = new google.maps.Circle({
  map: map.map,
  center: new google.maps.LatLng(-89.884144,-171.562500),
  fillColor: "#000000",
  fillOpacity: 0.6,
  strokeColor: "#000000",
  strokeOpacity: 0.8,
  strokeWeight: 1,
  clickable:false,
  transform: 'all 0.2s ease-in-out'
});

disableCircle.setRadius(20000000);

  map.setOptions({
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    DoubleClickZoom: false
  });
}

/////////////////////////////////////////////////////////Enable Map Controls
function enable(){
   if($('#displaySchools_CB').is(":checked")) {
    buildGreatSchoolCode();
   }
  if (removePolygonbutton == 1){
     $('.remove-polygons-btn').show();
   }
    $('.zoom-out-btn').show();
  $('.zoom-in-btn').show();
  $('.schools-btn').show();
  mapDisabled = 0;
  disableCircle.setMap(null);
  map.setOptions({
    draggable: true,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true
  });
}


////////////////////////////////////////////////////////////////Clear Polygons
function clearPolygons() {
    for(var i=0; i < polygons.length; i++){
      polygons[i].setMap(null);
    }
    geo = null;
    geoTermID = null;
    //updateJSVars();
    updateGetListingsJson();
    polygons = new Array();
    map.map.controls[google.maps.ControlPosition.TOP_RIGHT].pop();
    removePolygonbutton = 0;
};

///////////////////////////////////////////////////////////////////Freehand
function drawFreeHand(){

//the polygon
    poly=new google.maps.Polyline({map:map.map,clickable:false});

    //move-listener
    move=google.maps.event.addListener(map.map,'mousemove',function(e){
        poly.getPath().push(e.latLng);
    });
    //mouseup-listener
    google.maps.event.addListenerOnce(map.map,'mouseup',function(e){
        google.maps.event.removeListener(move);
        var path=poly.getPath();
        poly.setMap(null);

        var theArrayofLatLng = path.j;
        //var ArrayforPolygontoUse= GDouglasPeucker(theArrayofLatLng,10);

        var polyOptions = {
            map: map.map,
            fillColor: '#F9D8F9',
            fillOpacity: 0.5,
            strokeColor: '#D600D6',
            strokeWeight: 1,
            clickable: false,
            zIndex: 1,
            path:theArrayofLatLng,
            editable: false
        }


google.maps.Polyline.prototype.simplifyLine = function(tolerance){
  var res = null;

  if(this.getPath() && this.getPath().getLength()){
      var points = this.getPath().getArray();

      var Line = function( p1, p2 ) {
          this.p1 = p1;
          this.p2 = p2;

          this.distanceToPoint = function( point ) {
              // slope
              var m = ( this.p2.lat() - this.p1.lat() ) / ( this.p2.lng() - this.p1.lng() ),
                  // y offset
                  b = this.p1.lat() - ( m * this.p1.lng() ),
                  d = [];
              // distance to the linear equation
              d.push( Math.abs( point.lat() - ( m * point.lng() ) - b ) / Math.sqrt( Math.pow( m, 2 ) + 1 ) );
              // distance to p1
              d.push( Math.sqrt( Math.pow( ( point.lng() - this.p1.lng() ), 2 ) + Math.pow( ( point.lat() - this.p1.lat() ), 2 ) ) );
              // distance to p2
              d.push( Math.sqrt( Math.pow( ( point.lng() - this.p2.lng() ), 2 ) + Math.pow( ( point.lat() - this.p2.lat() ), 2 ) ) );
              // return the smallest distance
              return d.sort( function( a, b ) {
                  return ( a - b ); //causes an array to be sorted numerically and ascending
              } )[0];
          };
      };

      var douglasPeucker = function( points, tolerance ) {
          if ( points.length <= 2 ) {
              return [points[0]];
          }
          var returnPoints = [],
              // make line from start to end
              line = new Line( points[0], points[points.length - 1] ),
              // find the largest distance from intermediate poitns to this line
              maxDistance = 0,
              maxDistanceIndex = 0,
              p;
          for( var i = 1; i <= points.length - 2; i++ ) {
              var distance = line.distanceToPoint( points[ i ] );
              if( distance > maxDistance ) {
                  maxDistance = distance;
                  maxDistanceIndex = i;
              }
          }
          // check if the max distance is greater than our tollerance allows
          if ( maxDistance >= tolerance ) {
              p = points[maxDistanceIndex];
              line.distanceToPoint( p, true );
              // include this point in the output
              returnPoints = returnPoints.concat( douglasPeucker( points.slice( 0, maxDistanceIndex + 1 ), tolerance ) );
              // returnPoints.push( points[maxDistanceIndex] );
              returnPoints = returnPoints.concat( douglasPeucker( points.slice( maxDistanceIndex, points.length ), tolerance ) );
          } else {
              // ditching this point
              p = points[maxDistanceIndex];
              line.distanceToPoint( p, true );
              returnPoints = [points[0]];
          }
          return returnPoints;
      };
      res = douglasPeucker( points, tolerance );
      // always have to push the very last point on so it doesn't get left off
      res.push( points[points.length - 1 ] );
  }
  return res;
};
        var polyOptions = {
            map: map.map,
            fillColor: '#F9D8F9',
            fillOpacity: 0.5,
            strokeColor: '#D600D6',
            strokeWeight: 2,
            clickable: false,
            zIndex: 1,
            path:theArrayofLatLng,
            editable: false
        }

        poly=new google.maps.Polygon(polyOptions);

        simplePoly = GDouglasPeucker(poly.getPath().j, 20);

        simplePoly = simplePoly.toString();
        simplePoly = simplePoly.replace(/\ /g , "");

        // TODO: Figure out why it always drops the last paren
        polyUrl = location.href + '&poly=' + simplePoly + ')';


        // // remove first character
        // polyString = simplePoly.substr(1)
        //
        // // remove last character
        // polyString.substring(0, polyString.length - 1);
        //
        // // Turn each set into a collective array
        // polyArray = polyString.split("),(")
        //
        // // loop through to generate sub arrays
        //
        // for (var prop in polyArray) {
        //   polyArray[prop] = polyArray[prop].split(",");
        //  }



        // var pl = new google.maps.Polyline({...});
        polygons.push(poly);
    });
}










//////////////////////////////////////////////////// Get Current Map Radius
function getBoundsRadius(){
  mapCurrentBounds = map.getBounds();
  southWest = mapCurrentBounds.getSouthWest();
  northEast = mapCurrentBounds.getNorthEast();
  boundsDistance = haversine(northEast.lat(),northEast.lng(),southWest.lat(),southWest.lng());
  return parseFloat(kmToMiles(boundsDistance).toFixed(4)/2);
}

//////////////////////////////////////////////////////////////Reset the map zoom to stored var
var mapCenter = '';

function getMapFocus(){
  //radius = getBoundsRadius();
  currentMapZoom = map.getZoom();
  mapCenter = map.getCenter();
  currentMapLat = mapCenter.lat();
  currentMapLng = mapCenter.lng();
}


var listingIDs = [];

// This limits markers to polygon
var newLoadResults = function(data) {

  if (data.length > 0) {
    // Reset markers data
    markers_data = [];
    listingsDisplayed = 0;
    listingsInListDiv = 0;
    var items = data;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
        if (item.lat != undefined && item.lng != undefined) {
          listingsDisplayed = listingsDisplayed+1 ;
          var j = favoratedListingsIDs.indexOf(item.mlsId);
          if(j == -1) {
           var markerToUse = markImg;
          }else{
           var markerToUse = starMarkImg;
          }
          listingIDs.push(item.mlsId);
          markers_data.push({
          lat : item.lat,
          lng : item.lng,
          postID : item.mlsId,
          icon : markerToUse,
          mouseover: function(e){
              this.setIcon(altMarkImg);
          },
          mouseout: function(e){
            this.setIcon(markImg);
          },
          click: function(e) {

            //displayModal();
            NProgress.start();

            $.ajax({
              url: apiUrl + 'listing/' + this.postID,
              type: 'GET',
              dataType: 'json',
              crossDomain: true,
              data : {
                market: marketPlace
              }
              }).done(function(data) {

                // Use our Handlebars Template and append to page
                var source = $("#info-window-template").html();
                var template = Handlebars.compile(source);
                $('#over-map').append(template(data.property));

                $('#property-carousel').slick({
                  dots: false,
                  speed: 500,
                  slidesToShow: 2,
                  autoplay: true,
                  autoplaySpeed: 2000,
                });

                // Show the Modal Window
                $('#property-modal').modal();
                NProgress.done();

              });
          },
          draggable: false,
          fences: polygons,
       });
      }
    }
    //alert(typeof(markers_data));
    $('.map-search-results-geo').addClass('content-loaded');
    $('.map-search-results-list-bar').addClass('content-loaded');

    // remove all our markers prviously
    map.removeMarkersOfType('listings');

    //set out new marker listings
    gMarkers['listings'] = markers_data;
    // append to page
    map.addMarkersOfType('listings');

    // Here's our current displayed markers
    setTimeout(function(){
      // Quick hack
      // Count markers show, throw that in results
      //$('.map-search-results-count').text(commaSeparateNumber(map.markers.length) + ' listings found');
      if (map.markers.length === 1 ) {
        $('#listings-count').text(map.markers.length + ' listing found.');
      } else if ( map.markers.length === 0 ) {
        $('#listings-count').text('');
      } else {
        $('#listings-count').text(map.markers.length + ' listings found.');
      }
      
      //console.log(`Number of Listings ${map.markers.length}`);

      // Hide displayed listings in sidebar
      $('.search-listing').hide();

      // Loop through shown markers, show those items in sidebar
      map.markers.forEach(function (item) {
        //console.log(item);
        $("div[data-marker-id=" + item.postID + "]").show();
      })
     }, 1000);

	}
}


Handlebars.registerHelper('squareFeet', function(ft) {

  return new Handlebars.SafeString(
    ft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' sq. ft.'
  );
});



Handlebars.registerHelper('currency', function(price, type) {

  var string = '';

  if (type === 'RNT') {
    string = '$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'/month';
  } else {
    string = '$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return new Handlebars.SafeString(
    //'$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    string
  );
});

Handlebars.registerHelper('add', function(full, half) {
  return new Handlebars.SafeString(
    full + half
  );
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

Handlebars.registerHelper('monthYear', function(time) {

  var t = new Date(Date.parse(time));
  
  var month = 'Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec'.split(' ');
  return new Handlebars.SafeString(
    month[t.getMonth()] + ' ' + t.getFullYear()
  );
});

Handlebars.registerHelper('pricePerFoot', function(cost, feet, type) {
  var price = cost / feet;

  return new Handlebars.SafeString(
    Math.round(price * 100) / 100
  )
});

Handlebars.registerHelper('countArray', function(arr) {
 var html = '';
 if (arr.length != 1) {
  html += arr.length + ' photos';
 } else {
  html += arr.length + ' photo';
 }

  return new Handlebars.SafeString(
    html
  )
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




////////////////////////////////////////////////////
// Google Places API Search on 
// Create the search box and link it to the UI element.
var input = document.getElementById('address-search');

// var defaultBounds = new google.maps.LatLngBounds(
//   new google.maps.LatLng(30, -90),
//   new google.maps.LatLng(34, 104)
// );
var latLng = new google.maps.LatLng({lat: 31.60368570850012, lng: -99.17382001876797});
var radius = 640.3616;


  var options = {
    radius: radius,
    //location: latLng,
    componentRestrictions: {country: "us"}
   };

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      setUrlParams();
    } else {
//TODO
      map.setCenter(place.geometry.location.lat(), place.geometry.location.lng());
      map.setZoom(17);  // Why 17? Because it looks good.
      setUrlParams();
    }
    // marker.setIcon(/** @type {google.maps.Icon} */({
    //   url: place.icon,
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(35, 35)
    // }));

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }



  });

var activeDD = '';
/*
 *  Filters
 */
$('.menu-group-title').on('click', function() {
  var $this = $(this).parent();

  if ( activeDD != $this.find('ul').attr('id') ) {    
    $this.removeClass('active');
    $('.dropdown-content').removeClass('show');
    //$('.active-arrow').removeClass('fa-caret-up');
  }

  $this.toggleClass('active');
  $this.find('.dropdown-content').toggleClass('show');
  //$this.find('.fa').addClass('fa-caret-down');

   activeDD = $this.find('ul').attr('id');

  if (activeDD == 'price-dropdown') {
    $('#price-min').focus();
  }

});

function closeSearchFilters() {
  $('.dropdown').removeClass('active');
  $('.dropdown-content').removeClass('show');
}

$('#price-min').on('focus', function() {
  $('#min-price-list').css('display', 'block');
  $('#max-price-list').css('display', 'none');

});

$('#min-price-list li').on('click', function(e) {
  var $this = $(this);
  var priceMin = parseInt($this.html().replace('$', '').replace(',','').replace('+', ''));
  $('#price-min').val(priceMin);
  // generate our max price ...
  var html = '',
      $maxPriceList = $('#max-price-list'),
      newPrice = priceMin + 25000;

  for (var i = 0; i < 9; i++) {

    html += '<li>' + '$ '+newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</li>'; 
    newPrice += 25000;

  }
  html += '<li> Any Price </li>';
  $maxPriceList.html(html);
  $('#price-max').focus();

  $('#max-price-list li').on('click', function(e) {
    var $this = $(this);
    $('#price-max').val($this.html().replace('$', '').replace(',','').replace('+', '').replace(' ',''));
    closeSearchFilters();
    updateGetListingsJson();
  });


})




$('#price-max').on('focus', function() {
  $('#max-price-list').css('display', 'block');
  $('#min-price-list').css('display', 'none');

});
/*
 *  Update Property Search Parameters
 */
  function updateSearchParameters() {
    beds = $('#beds').val().replace('+',''),
    //beds = beds.toString().replace('+',''),
    sqft_min = $('#sq-ft-min').val(),
    sqft_max = $('#sq-ft-max').val(),
    year_built_min = $('#year-built-min').val(),
   // year_built_max = $('#year-built-max').val(),
    baths = $('#baths').val().replace('+',''),
    price_min = $('#price-min').val(),
    price_max = $('#price-max').val(),
    residential = $('#residential:checked').val(),
    rental = $('#rental:checked').val(),
    //multifamily = $('#multifamily:checked').val(),
    condominium = $('#condominium:checked').val(),
   // commercial = $('#commercial:checked').val(),
   // land = $('#land:checked').val();
    sortBy = $('#sidebar-sort').find(':selected').val()


   // lot_size_min = $('#lot-size-min').val();
   // lot_size_max = $('#lot-size-max').val();
    //price_min = $('#price-min').val();
    //price_max = $('#price-max').val();
  }

  // Manage the event to update our search filters
  $('.apply-search-filter').on('click', function() {
    updateGetListingsJson();
    closeSearchFilters();
  });

  // Change for Sorting Dropdown
  $('#sidebar-sort').change( function() {
    updateGetListingsJson();
  });

  /*
   * Highlight and Bounce Icon on the Map
   */
  $(document).on('mouseover', '.sidebar-block', function(e){
    var $this = $(this);
    var $mlsId = $this[0]['attributes']['data-mls-id'].value,
        currentProperty;

    //$this.addClass('active-hover');

    for( var i=0; i < gMarkers['listings'].length; i++ ) {       
      if( gMarkers['listings'][i].postID == $mlsId){
        currentProperty = i;
      }
    }

    realMarkers['listings'][currentProperty].setAnimation(google.maps.Animation.BOUNCE);
    realMarkers['listings'][currentProperty].setIcon(altMarkImg);
  });

  // on mouseout
  $(document).on('mouseout', '.sidebar-block', function(e){
    var $this = $(this);
    var $mlsId = $this[0]['attributes']['data-mls-id'].value,
        currentProperty;

   // $this.removeClass('active-hover');

    for( var i=0; i < gMarkers['listings'].length; i++ ) {       
      if( gMarkers['listings'][i].postID == $mlsId){        
        currentProperty = i;
      }
    }

    realMarkers['listings'][currentProperty].setAnimation(google.maps.Animation.NONE);
    realMarkers['listings'][currentProperty].setIcon(markImg);
  });

  /**
   *  Display Modal Pop Up on Thumbnail Image Click
   **/
   $(document).on('click', '.thumbnail-property', function() {   
    var $this = $(this);

    //console.log($this.parent().parent().attr('data-mls-id'));

    //displayModal();
      NProgress.start();

      $.ajax({
        url: apiUrl + 'listing/' + $this.parent().parent().attr('data-mls-id')+'?market='+marketPlace,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        }).done(function(data) {

          var propertyObj = {
            market : marketPlace,
            property: data.property
          }
          // Use our Handlebars Template and append to page
          var source = $("#info-window-template").html();
          var template = Handlebars.compile(source);
          $('#over-map').append(template(data.property));

          $('#property-carousel').slick({
            dots: false,
            speed: 500,
            slidesToShow: 2,
            autoplay: true,
            autoplaySpeed: 2000,
            lazyLoad: 'ondemand',
          });

          // Show the Modal Window
          $('#property-modal').modal();
          NProgress.done();

        });
   });

  /*
   *  Change Market Locations
   *  @choices : lou, sind, lex, nky
   */
   $('#markets').change( function() {
    var $this = $(this);
    var $selected = $this.find(':selected').val();
    var zoom = 14;
    var $sqFt = $('.sq-ft-row');

    $sqFt.css('display', 'block');

    if ($selected == 'lou') {
      map.setCenter(38.211074, -85.734558);
      map.setZoom(zoom);
      marketPlace = 'lou';


    } else if ($selected == 'sind') {
      window.map.setCenter(38.307277, -85.748978);
      window.map.setZoom(zoom); 
      marketPlace = 'sind';

    } else if ($selected == 'lex') {
      map.setCenter(38.044542, -84.502716); 
      map.setZoom(zoom);    
      marketPlace = 'lex';
    } else {
      map.setCenter(39.040220, -84.491730);    
      map.setZoom(zoom); 
      marketPlace = 'nky';
      $sqFt.css('display', 'none');
    }

    setUrlParams();
    //map.setZoom(4);
   });



   /***
    * URL Parameter Management for State of the Map
    * - Get the position of the map by lat and long, get zoom level too.
    * - Update the URL to the current filters set on the map 
    *
    */

    var currentURL = window.location.href;

    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }


    function changeUrlParam (param, value) {

      var currentURLChange = window.location.href+'&';
      var change = new RegExp('('+param+')=(.*)&', 'g');
      var newURL = currentURLChange.replace(change, '$1='+value+'&');

      if (getURLParameter(param) !== null){
          try {
              window.history.replaceState('', '', newURL.slice(0, - 1) );
          } catch (e) {
              console.log(e);
          }
      } else {
          var currURL = window.location.href;
          if (currURL.indexOf("?") !== -1){
              window.history.replaceState('', '', currentURLChange.slice(0, - 1) + '&' + param + '=' + value);
          } else {
              window.history.replaceState('', '', currentURLChange.slice(0, - 1) + '?' + param + '=' + value);
          }
      }
      currentURL = window.location.href;
     // Cookies.set('lastSearch',currentURL);
    }

    function setUrlParams() {
      getMapFocus();
     
      changeUrlParam('zoom', currentMapZoom);
      changeUrlParam('lng', currentMapLng);
      changeUrlParam('lat', currentMapLat);
      changeUrlParam('market', marketPlace);
      if(beds >= 1) { changeUrlParam('beds', beds); }
      if(baths >= 1) { changeUrlParam('baths', baths); }
      if(sqft_max >= 1) { changeUrlParam('sqft_max', sqft_max); }
      if(sqft_min >= 1) { changeUrlParam('sqft_min', sqft_min); }
      if(year_built_min >= 1) { changeUrlParam('year', year_built_min); }
      if(price_min > 0) { changeUrlParam('price_min', price_min); }
      if(price_max > 0) { changeUrlParam('price_max', price_max); }
      if(residential != undefined) { changeUrlParam('residential', residential); }
      if(condominium != undefined) { changeUrlParam('condominium', condominium); }
      if(rental != undefined) {changeUrlParam('rental', rental); }




    }

    function applyURLParamsToFilter() {

      if (beds >= 1 ) { $('#beds').val(beds+'+'); }
      if (baths >= 1) { $('#baths').val(baths+'+'); }
      if (sqft_min >= 1 ) { $('#sq-ft-min').val(sqft_min); }
      if (sqft_max >= 1 ) { $('#sq-ft-max').val(sqft_max); }
      if (year_built_min >= 1) { $('#year-built-min').val(year_built_min); }
      if (price_min > 0) { $('#price-min').val(price_min); }
      if (price_max > 0) { $('#price-max').val(price_max); }
      if (residential != undefined) { $('#residential').attr('checked', true); }
      if (condominium != undefined) { $('#condominium').attr('checked', true); }
      if ( marketPlace != undefined) { $('#markets option[value="'+marketPlace+'"]').prop('selected', true); }
      
      if (rental != undefined) { $('#rental').attr('checked', true); }
    }

    applyURLParamsToFilter();



    /*
     *  Alti Exclusive Slider
     *
     *
     */

     $.ajax({
        url: apiUrl + 'exclusive',
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
      }).done(function(data) {
          
          // Use our Handlebars Template and append to page
          var source = $("#exclusive-property-slider").html();
          var template = Handlebars.compile(source);
          $('.exclusive-wrapper').append(template(data));

          // Slick our Slides
         $('#exclusive-slider').slick({
            dots: true,
            infinite: true,
            speed: 3000,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
          });
      });

     



}

function GDouglasPeucker(a,t){var l,r,n,h,e,s,M,g,o,b,f,u,c,w,y,A,i,P,v,I=Math.PI/180*.5,k=new Array,p=new Array,D=new Array;if(a.length<3)return a;for(l=a.length,b=360*t/(2*Math.PI*6378137),b*=b,n=0,p[0]=0,D[0]=l-1,r=1;r>0;)if(h=p[r-1],e=D[r-1],r--,e-h>1){for(f=a[e].lng()-a[h].lng(),u=a[e].lat()-a[h].lat(),Math.abs(f)>180&&(f=360-Math.abs(f)),f*=Math.cos(I*(a[e].lat()+a[h].lat())),c=f*f+u*u,s=h+1,M=h,o=-1;e>s;s++)w=a[s].lng()-a[h].lng(),y=a[s].lat()-a[h].lat(),Math.abs(w)>180&&(w=360-Math.abs(w)),w*=Math.cos(I*(a[s].lat()+a[h].lat())),A=w*w+y*y,i=a[s].lng()-a[e].lng(),P=a[s].lat()-a[e].lat(),Math.abs(i)>180&&(i=360-Math.abs(i)),i*=Math.cos(I*(a[s].lat()+a[e].lat())),v=i*i+P*P,g=A>=c+v?v:v>=c+A?A:(w*u-y*f)*(w*u-y*f)/c,g>o&&(M=s,o=g);b>o?(k[n]=h,n++):(r++,p[r-1]=M,D[r-1]=e,r++,p[r-1]=h,D[r-1]=M)}else k[n]=h,n++;k[n]=l-1,n++;for(var G=new Array,s=0;n>s;s++)G.push(a[k[s]]);return G}


export default Site;