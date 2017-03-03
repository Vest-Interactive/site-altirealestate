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

		var PropertyResults = data['GetSearchResults']['SearchResults:searchresults']['response']['results']['result'],
				PropertyGraph = data['GetGraph']['Chart:chart']['response'],
				PropertyComps = data['GetComps']['Comps:comps']['response']['properties']['comparables'];

		var PropertyEstimateResults = {
				PropertyResults : PropertyResults,
				PropertyGraph : PropertyGraph,
		}

		var source = $("#sell-property-detail-template").html();
  	var template = Handlebars.compile(source);

  	console.log(PropertyEstimateResults);
  	$('#property-estimate-results').html(template(PropertyEstimateResults));

  	var compSource = $('#sell-comp-detail-template').html();
  	var compTemplate = Handlebars.compile(compSource);

  	console.log(PropertyComps);
  	$('#comp-estimate-results').html(compTemplate(PropertyComps));
	}


Handlebars.registerHelper('currency', function(price) {
  return new Handlebars.SafeString(
    '$ '+price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
});


