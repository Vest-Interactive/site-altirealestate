

function Sell($) {
	
	// Add in the Google Places Auto Complete for the Search 

	var input = document.getElementById('home-address-input');

	var defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(30, -90),
	  new google.maps.LatLng(34, 104)
	);
	var latLng = new google.maps.LatLng({lat: 31.60368570850012, lng: -99.17382001876797});
	var radius = 640.3616;


  var options = {
    radius: radius,
    location: latLng,
    componentRestrictions: {country: "us"}
   };

  var autocomplete = new google.maps.places.Autocomplete(input, options);


	google.maps.event.addListener(autocomplete, 'place_changed', function() {
	  var place = autocomplete.getPlace();
	  if (!place.geometry) {
	    window.alert("Autocomplete's returned place contains no geometry");
	    return;
	  }
	});

	/*
	 *	Handle the Property Estimation Form
	 *	- 
	 */
	$('form#home-address-search-input').on('submit', function(e) {

		e.preventDefault();

		if (input.value != '') {

			var url = input.value.split(','),
					address = replaceSpace(url[0]),
					city = replaceSpace(url[1]),
					state = url[2].replace(' ', '');

			var zillowGetSearchResults = 'https://altirealestate.herokuapp.com/estimate'

			$.ajax({
				url: zillowGetSearchResults,
    		type: 'GET',
    		dataType: 'json',
    		data: {
    			address : address,
    			city: city,
    			state: state
    		},
    		success: function(resp) {
    			
    			console.log(resp);

    			if (resp.hasOwnProperty('status') ) {
    				$('#estimate-error').html('We could not find an estimate on that address.');
    				setTimeout( function() {
    					$('#estimate-error').html('');
    				}, 8000);
    			} else {
						$('#search-block').fadeOut();
							setTimeout(function() {
								displayEstimateTemplates(resp);
							}, 500);
    			}


    			//history.pushState({id: '1'}, '', 'sell#search');
    		
    			
    		}
    	});
		}

		// Helper function to replace spaces with + 
		function replaceSpace(text) {
			return text.split(' ').join('+');
		}


	});

	/*
	 *	Manage the HTML and Appending to Page
	 */
	function displayEstimateTemplates(data) {

		var hasComps = false,
				hasGraph = false,
				hasEstimate = false;


		if (data['GetComps']['Comps:comps']['message']['code'] == 0) {
			var hasComps = true;
		} 

		if (data['GetGraph']['Chart:chart']['message']['code'] == 0) {
			hasGraph = true;
		}

		var searchResultObj;

		if (data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result'].length > 1 ) {
//			var hasEstimate = checkForAmount(data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result'][1]);

			searchResultObj = data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result'][1];
			

		} else {
			searchResultObj = data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result'];
		}


		function checkForAmount(obj) {
			return obj.zestimate.amount.hasOwnProperty('_');
		}

		// check for estimate property exists..
		//var hasEstimateProp = data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result']['zestimate']['amount'].hasOwnProperty('_');
		//var hasEstimateProp = checkForAmount(data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result']);

		//console.log(hasEstimateProp);

		var hasEstimateProp = searchResultObj['zestimate']['amount'].hasOwnProperty('_');

		if (data['GetSearchResults']['SearchResults:searchresults']['message']['code'] == 0 && hasEstimateProp) {
			hasEstimate = true;
		}


		// Now setup our Values..
		if (hasComps) {
			var compSource = $('#sell-comp-detail-template').html();
  		var compTemplate = Handlebars.compile(compSource);
			var PropertyComps = data['GetComps']['Comps:comps']['response']['properties']['comparables'];
			$('#comp-estimate-results').html(compTemplate(PropertyComps));
		}



		if (hasEstimate) {
			//var PropertyResults = data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result'];
			var PropertyResults = searchResultObj;

			if (hasGraph) {
				var PropertyGraph = data['GetGraph']['Chart:chart']['response'];

				var PropertyEstimateResults = {
					PropertyResults : PropertyResults,
					PropertyGraph : PropertyGraph,
				}
			} else {
				var PropertyEstimateResults = {
					PropertyResults : PropertyResults,
					PropertyGraph: {}
				}
			} 			

			var source = $("#sell-property-detail-template").html();
	  	var template = Handlebars.compile(source);

	  	$('#property-estimate-results').html(template(PropertyEstimateResults));
		} else {
			var html = '<h1> We could not determine a price for this address. </h1>';
			$('#property-estimate-results').html(html);

			setTimeout(function() {
				$('#home-address-input').val('');
				$('#search-block').fadeIn();
				$('#property-estimate-results').html('');
			}, 1500);
			
		}



  	
	}


Handlebars.registerHelper('currency', function(price) {
  return new Handlebars.SafeString(
    '$'+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
});

Handlebars.registerHelper('squareFeet', function(ft) {

	return new Handlebars.SafeString(
		ft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' sq. ft.'
	);
});

}

export default Sell;