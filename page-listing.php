<?php 
get_header();
?>



<div id="property-details-page" class='animated'></div>

<div class='ajax-loading property-page'>
	<img src="<?php bloginfo('template_directory'); ?>/images/purple-original-loading-gif-large.gif" alt="">
</div>

<div class="property-realtor-block animated ">
	<div class="grid-width block-center">
		<div class='col col-two-third realtor-wrapper'>
			<h2>Ready to see this property?</h2>
			<div class='sub-text'>Enter your information and we will contact you to answer your questions and introduce you to this property.</div>
			<div class="realtor-block">
				<div class='image-block col col-one-third'>
					<img src='<?php bloginfo('template_directory'); ?>/images/greg-taylor-avatar.jpg'>
				</div>
				<div class="image-details col col-two-third">
					<p class='title'>Greg Taylor</p>
					<p>Broker, Commercial Broker, CRS, ABR, SRES, CDPE, MRP, CRP, GRI, RENE, SFR <a class='learn-more-certs' href='/about' title="Learn more about Alti's Certifications">learn more</a> </p>
					<p class='phone'><i class="fa fa-phone" aria-hidden="true"></i> <a href='tel:15029667325' title='Call Alti about this listing!'>(502) 966-7325</a></p>
				</div>
			</div>
		</div>
		<div class='form-wrapper col col-one-third'>
			<form id='property-realtor-form'>
				<div class='input-row'>
					<input type="text" id='name' name='name' placeholder='name'>
					<label class='clip' for="name" aria-hidden='true'>Name</label>
				</div>
				<div class="input-row">
					<input type="text" id='phone' name='phone' placeholder='phone number'>
					<label class='clip' for="phone">Phone</label>
				</div>
				<div class="input-row">
					<input type="text" id='email' name='email' placeholder='email'>
					<label class='clip' for="email">Email</label>
				</div>

				<div class="input-row">
					<button>Send</button>
				</div>
			</form>
		</div>
	</div>
</div>

<script id='property-detail-page-template' type="text/x-handlebars-template">
	<div class="page-navigation-title">
		<div class="grid-width block-center">
			<h1> {{address.full}}, {{address.city}}, {{address.state}} {{address.postalCode}} </h1>
		</div>
	</div>

	<div class="property-details-wrapper grid-width block-center">

			<div class="property-slider-block">

				<div class="property-slider-for">
					{{#each photos}}
					<div>
						<img src='{{this}}'/>
					</div>
					{{/each}}
				</div>
				<div class="property-slider-nav">
					{{#each photos}}
					<div>
						<img src='{{this}}'/>
					</div>
					{{/each}}
				</div>
			</div>
	

		<div class='details-sidebar'>
			<div class='general-overview'>

			<div id='property-map-location'></div>

				<div class='grid-wrapper'>
					<div class='row'>
						<div class='block col thin'>
							<span class='detail'> {{property.bedrooms}} </span>
							<span class='description'> Beds </span>
						</div>
						<div class='block col thin'>
							<span class='detail'> {{property.bathsFull}} </span>
							<span class='description'> Full Baths </span>
						</div>
						{{listingPrice listPrice property.type}}
					</div>

					<div class='row bottom-row'>
						<div class='block col thin '>
							<span class='detail'> {{#if property.stories}} {{property.stories}} {{else}} NA {{/if}} </span>
							<span class='description'> Stories </span>
						</div>
						<div class='block col thin'>
							<span class='detail'> {{property.bathsHalf}} </span>
							<span class='description'> Half Baths </span>
						</div>
						{{estMonthlyBlock listPrice property.type}}
					</div>

				</div>

				<div class='description-block'>
					<h4> Description </h4>
					<p> {{remarks}} </p>
				</div>


			</div>
		</div>

		<!-- Block Facts -->
		<div class='row'>
			<div class="specific-details-wrapper property-facts col col-half">
				<h3>Property Facts</h3>
				<ul>
					<li>
						<strong>MLS ID Number:</strong> <span>{{listingId}}</span>
					</li>
					<li>
						<strong>Area:</strong> <span>{{mls.area}}</span>
					</li>
					{{#if listDate}}<li>
						<strong>On Market:</strong> <span>{{fromNow listDate}}</span>
					</li>{{/if}}
					<li>
						<strong>Year Built:</strong> <span>{{property.yearBuilt}}</span>
					</li>
					{{#if property.area}}<li>
						<strong>Square Feet</strong> <span>{{squareFeet property.area}}</span>
					</li>{{/if}}
					{{#if property.lotSizeArea}}<li>
						<strong> Lot Area Size:</strong> <span>{{squareFeet property.lotSizeArea}}</span>
					</li>{{/if}}
					<li>
						<strong>Full Baths:</strong> <span>{{property.bathsFull}}</span>
					</li>
					<li>
						<strong>Half Baths:</strong> <span>{{property.bathsHalf}}</span>
					</li>
					<li>
						<strong>Beds:</strong> <span>{{property.bedrooms}}</span>
					</li>
					{{#if property.soundation}}<li>
						<strong>Foundation:</strong> <span>{{property.foundation}}</span>
					</li>{{/if}}
					<li>
						<strong>Roof:</strong> <span>{{property.roof}}</span>
					</li>
					{{#if property.heating}}<li>
						<strong>Heating:</strong> <span>{{heatingFormat property.heating}}</span>
					</li>{{/if}}
					{{#if property.stories}}<li>
							<strong>Stories:</strong> <span>{{property.stories}}</span>
					</li> {{/if}}
					{{#if property.view}}<li>
						<strong>View:</strong> <span>{{property.view}}</span>
					</li> {{/if}}
				</ul>
			</div>

			<div class='specific-details-wrapper property-features col col-half'>
				<h3> Property Features </h3>
				<ul>
					{{#if property.subType}}<li><strong>Property Type:</strong><span>{{subType property.subType}}</span></li>{{/if}}
					{{#if property.exteriorFeatures}} {{#exterior property.exteriorFeatures}}{{/exterior}} {{/if}}
					{{#if property.interiorFeatures}} {{#interior property.interiorFeatures}}{{/interior}} {{/if}}
				</ul>
			</div>
		</div>


	</div> <!-- End Wrapper -->





	</div>

</script>


<?php 
get_footer();
?>