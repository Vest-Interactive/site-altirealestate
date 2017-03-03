import GMaps from 'gmaps';
import slick from 'slick-carousel';
import NProgress from 'nprogress';
import moment from 'moment';

import modal from './modal.min';


function Site($, params) {

	let options = params || {};

	/*
	 * Get URL Parameter by Name and return the value
	*/
	function getParameterByName(name) {
	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	}


GMaps.prototype.removeMarkersOfType = function (poi_type) {
    // for each real marker of this type
    $.each(realMarkers[poi_type],function(index, obj){
	    // remove the marker
	    map.removeMarker(obj);
    });
    // clear markers of this type
    realMarkers[poi_type]=[];
    // clears the results side bar
   // if (poi_type == 'listings'){$('#results').html('');};
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
             console.log(`Number of Listings Found : ${listingsDisplayed}`);
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


	var siteUrl = 'http://maxavenue.com'
	

	//var changetm = null;
	//var user_id = 0;  User Listings Not Supported at the moment (Upsell)
	//var changeGeoTO = null;
	//var photoRootUrl = "/wp-content/upload/uploads/MLSPhotos/";
	var gMarkers = []; // Contain the difference between a listing and a school type
	window.realMarkers = []; // These contain the markers on the current Map
	//var infoWindows = [];
	var polygonAry = []; // List the current variables of polygon points
	window.map = null; // Reset and clear the map global variable
	var radius = 0; // Holds the radius for positioning locations nearby to center
	//var markerClusterer = null;
	//var imageUrl = siteUrl+'/wp-content/themes/bones-master/library/images/marker.png';
	var imageUrl = '/images/ra-marker-purple-home@2x.png';
	var imageSchoolUrl = siteUrl+'/wp-content/themes/bones-master/library/images/marker-school.png';
	var imageUrlCluster = siteUrl+'/wp-content/themes/bones-master/library/images/marker-cluster.png';
	//var imageUrlSelected = siteUrl+'/wp-content/themes/bones-master/library/images/marker-selected.png';
	var imageUrlSelected = '/images/ra-marker-green-home@2x.png';
	var imageUrlStarted = siteUrl+'/wp-content/themes/bones-master/library/images/marker-star.png';
	//var imageUrlStartedSelected = siteUrl+'/wp-content/themes/bones-master/library/images/marker-star-selected.png';
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


var currentMapZoom = parseInt(getParameterByName('zoom'));
if(currentMapZoom==null){currentMapZoom=11;};
var currentMapLat = getParameterByName('lat');
if(currentMapLat==null){currentMapLat=29.9905482;};
var currentMapLng = getParameterByName('lng');
if(currentMapLng==null){currentMapLng=-95.5253703;};
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
var lot_size_min = getParameterByName('lot_size_min');
if(lot_size_min==null){lot_size_min=0;};
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
if(sortBy==null){sortBy="D";};

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
//var apiUrl = 'http://localhost:6969/';
var apiUrl = 'http://altirealestate.herokuapp.com/';
//var apiUrl = 'http://listings.altirealestate.com/';

function updateGetListingsJson(){
	
  $('.over-map').hide(); // this is our modal... we remove it everytime a listing is updated
  //updateJSVars();
  $('#loadingDiv').show();

  // TODO: We should only remove listings if they aren't in the new batch because of filters, not for changing viewport
  map.removeMarkersOfType('listings');

 // console.log(`geo = ${geo} , price_min = ${price_min}, sortBy = ${sortBy}`);

  // Alti Api - Send our filter settings too
 //  $.get( apiUrl + "listing", {
 //    geo:geo,
 //    price_min:price_min,
 //    price_max:price_max,
 //    baths:baths,
 //    beds:beds,
 //    sqft_min:sqft_min,
 //    sqft_max:sqft_max,
 //    // northEastLat: northEast.lat(),
 //    // northEastLng: northEast.lng(),
 //    // southWestLat: southWest.lat(),
 //    // southWestLng: southWest.lng(),
 //    northEastLat: map.getBounds().getNorthEast().lat(),
 //    northEastLng: map.getBounds().getNorthEast().lng(),
 //    southWestLat: map.getBounds().getSouthWest().lat(),
 //    southWestLng: map.getBounds().getSouthWest().lng(),
 //    sortBy:sortBy
 //  }, 'jsonp')
 //  .done(function( data ) {

 //  	console.log(data);
 //    if (data.total === 0) {
 //      //$('#loadingDiv').hide();
 //     // $('#results').html('<div><center><BR><BR><BR><BR><b>no matching results...</b><br> Try zooming out or adjusting your search criteria.</center></div>');
 //      $('.map-search-results-count').html("No Listings Found.");
 //    } else {

 //      window.data = data;
 //      newLoadResults(data.listings);
 //      //updateSidebar(data);
 //     // $('.map-search-results-count').text(commaSeparateNumber(data.total) + ' listings found');
 //    }
 //    // TODO: Here's one
 //     // getNearbyGeo();

	// });

$.ajax({
  url: apiUrl + 'listing',
  type: 'GET',
  data: {
    geo:geo,
    price_min:price_min,
    price_max:price_max,
    baths:baths,
    beds:beds,
    sqft_min:sqft_min,
    sqft_max:sqft_max,
    northEastLat: map.getBounds().getNorthEast().lat(),
    northEastLng: map.getBounds().getNorthEast().lng(),
    southWestLat: map.getBounds().getSouthWest().lat(),
    southWestLng: map.getBounds().getSouthWest().lng(),
    sortBy:sortBy
  },
  dataType: 'json',
  crossDomain: true,
  }).done(function(data) {
    console.log(data);
        if (data.total === 0) {
      //$('#loadingDiv').hide();
     // $('#results').html('<div><center><BR><BR><BR><BR><b>no matching results...</b><br> Try zooming out or adjusting your search criteria.</center></div>');
      $('#listings-count').text("0");
    } else {

      window.data = data;
      newLoadResults(data.listings);
      updatePropertySidebar(data);
      //updateSidebar(data);
      //$('.map-search-results-count').text(commaSeparateNumber(data.total) + ' listings found');
    }
    // TODO: Here's one
     // getNearbyGeo();
  });


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
    margin: '20px',
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
function getMapFocus(){
  radius = getBoundsRadius();
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
              // var i = favoratedListingsIDs.indexOf(this.mlsId);
              // if(i == -1) {
              //   this.setIcon(altMarkImg);
              // }else{
              //   this.setIcon(starSelectedMarkImg);
              // }
              // curentListing = this;
              // window.fart = this;
              //updateInfoWindow(this.postID);
              //console.log(this);
              this.setIcon(altMarkImg);
          },
          mouseout: function(e){
           // clearTimeout(timer);
           //  var i = favoratedListingsIDs.indexOf(this.mlsId);
           //  if(i == -1) {
           //    this.setIcon(markImg);
           //  }else{
           //    this.setIcon(starMarkImg);
           //  };
            this.setIcon(markImg);
          },
          click: function(e) {
            NProgress.start();
           // console.log(this);
            // Query Our API Wrapper and Return the details of this Property
            $.ajax({
              url: apiUrl + 'listing/' + this.postID,
              type: 'GET',
              dataType: 'json',
              crossDomain: true,
              }).done(function(data) {
                console.log(data);
                // Use our Handlebars Template and append to page
                var source = $("#info-window-template").html();
                var template = Handlebars.compile(source);
                $('#over-map').append(template(data.property));

                $('#property-carousel').slick({
                  dots: false,
                  speed: 500
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
      $('#listings-count').text(map.markers.length)
      //console.log(`Number of Listings ${map.markers.length}`);

      // Hide displayed listings in sidebar
      $('.search-listing').hide();

      // Loop through shown markers, show those items in sidebar
      map.markers.forEach(function (item) {
        console.log(item);
        $("div[data-marker-id=" + item.postID + "]").show();
      })
     }, 1000);

	}
}





Handlebars.registerHelper('currency', function(price) {

  return new Handlebars.SafeString(
    '$ '+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
});

Handlebars.registerHelper('add', function(full, half) {
  return new Handlebars.SafeString(
    full + half
  );
});

Handlebars.registerHelper('fromNow', function(time) {
  var t = new Date(Date.parse(time));
  t = t.getYear()+t.getMonth()+t.getDay();

  return new Handlebars.SafeString(
    //t.toDateString()
    moment(t, "YYMMDD").fromNow() + ' on alti'
  );
});

Handlebars.registerHelper('monthYear', function(time) {
  var t = new Date(Date.parse(time));
  var month = 'Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec'.split(' ');
  return new Handlebars.SafeString(
    month[t.getMonth() -1] + ' ' + t.getYear()
  );
});

Handlebars.registerHelper('pricePerFoot', function(cost, feet) {
  var price = cost / feet;

  return new Handlebars.SafeString(
    Math.round(price * 100) / 100
  )
});




////////////////////////////////////////////////////
// Google Places API Search on 



}

export default Site;