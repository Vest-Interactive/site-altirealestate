<?php /* Template Name:  Property Search Template Page  */ ?>
<?php get_header(); ?>


<div id="property-search-page">

	<div class="page-navigation-title">
		<div class="grid-width block-center">
			<h1> buy a home </h1>
		</div>
	</div>

	<div class='map-filter-block'>
		<div class="grid-width block-center">
			<nav>
				<ul class='menu'>

					<li>
						<div class="address-search-block">
							<label for="address-search" class='clip'>Search for an address</label>
							<input id='address-search' name='address-search' type="text">
						</div>
					</li>

					<li class='dropdown'>
						<div class='menu-group-title'> Property Type <i class="fa fa-caret-down active-arrow" aria-hidden="true"></i></div>
						<ul id='property-dropdown' class='dropdown-content types'>
							<li class='option'>								
								<input type='checkbox' id='residential' name='residential' checked='true' value='residential'>
								<label for="residential">Residential</label>
							</li>
							<li>
								<input type='checkbox' id='rental' name='rental' value='rental'>
								<label for="rental">Rental</label>
							</li>
							<!-- <li>
								<input type='checkbox' id='multifamily' name='multifamily' value='multifamily'>
								<label for="multifamily">Multifamily</label>
							</li> -->
							<li>
								<input type='checkbox' id='condominium' name='condominium' value='condominium'>
								<label for="condominium">Condominium</label>
							</li>
							<!-- <li> 
								<input type='checkbox' id='commercial' name='commercial' value='commercial'>
								<label for="commercial">Commercial</label>
							</li> -->
							<!-- <li> 
								<input type='checkbox' id='land' name='land' value='land'>
								<label for="land">Land</label>
							</li> -->
							<li>
								<div class="row">
									<div class='apply-search-filter' role="button">
										APPLY
									</div>
								</div>
							</li>
						</ul>
					</li>

					<li class='dropdown'>
						<div class='menu-group-title'> Property Details <i class="fa fa-caret-down active-arrow" aria-hidden="true"></i></div>
						<ul id='details-dropdown' class='dropdown-content details'>
							<li class='col col-half'>
								<div class="row">
									<div class="label-wrapper">
										<label for="beds">Beds</label>
									</div>
									<select name="beds" id="beds">
										<option value="0+">0+</option>
										<option value="1+">1+</option>
										<option value="2+">2+</option>
										<option value="3+">3+</option>
										<option value="4+">4+</option>
										<option value="5+">5+</option>
									</select>									
								</div>

								<div class="row sq-ft-row">
									<div class="label-wrapper">Sq Ft</div>
									<div class='input-block'>
										<label for="sq-ft-min" class='clip'>Enter Minimum Square Feet</label>
										<label for="sq-ft-max" class='clip'>Enter Maximum Square Feet</label>
										<input type="text" name='sq-ft-min' id='sq-ft-min' placeholder='Min'> - <input type="text" id='sq-ft-max' name='sq-ft-max' placeholder='Max'>
									</div>
								</div>

							</li>

							<li class='col col-half'>
								<div class="row">
									<div class="label-wrapper">
										<label for="baths">Baths</label>
									</div>
									<select name="baths" id="baths">
										<option value="0+">0+</option>
										<option value="1+">1+</option>
										<option value="2+">2+</option>
										<option value="3+">3+</option>
										<option value="4+">4+</option>
										<option value="5+">5+</option>
									</select>									
								</div>

							<!-- 	<div class="row">
									<div class="label-wrapper"><label for="lot-size">Lot Size</label></div>
									<div class='input-block'>
										<input type="text" name='lot-size-min' id='lot-size-min' placeholder='Min'> - <input type="text" name='lot-size-max' id='lot-size-max' placeholder='Max'>
									</div>
								</div>		 -->
								<div class="row">
									<div class="label-wrapper"><label for="year-built-min">Year</label></div>
									<div class='input-block'>
										<input type="text" id='year-built-min' name='year-built-min' placeholder='Min'>
									</div>
								</div>				
							</li>						
						<div class="row">
									<div class='apply-search-filter' role="button">
										APPLY
									</div>
								</div>
						</ul>

					</li>

					<li class='dropdown'>
						<div class='menu-group-title'> Price Range <i class="fa fa-caret-down active-arrow" aria-hidden="true"></i></div>
						<ul id='price-dropdown' class='dropdown-content types'>
							<li>	
								<div class="row">
									<!-- <div class="label-wrapper"><label for="year-built">Min</label></div> -->
									<div class='input-block'>
										<label for="price-min" class='clip'>Minimum Price of Listing</label>
										<label for="price-max" class='clip'>Maximum Price of Listing</label>
										<input type="text" id='price-min' name='price-min' placeholder='Min'> - <input type='text' id='price-max' name='price-max' placeholder='Max'>
									</div>
								</div>		
							</li>

							<li>
								<ol id='min-price-list'>
									<li>0</li>
									<li>$50,000+</li>
									<li>$75,000+</li>
									<li>$100,000+</li>
									<li>$150,000+</li>
									<li>$200,000+</li>
									<li>$250,000+</li>
									<li>$300,000+</li>
									<li>$400,000+</li>
									<li>$500,000+</li>
								</ol>

								<ol id='max-price-list'>
									<!-- <li>$125,000</li>
									<li>$150,000</li>
									<li>$175,000</li>
									<li>$200,000</li>
									<li>$225,000</li>
									<li>$250,000</li>
									<li>$275,000</li>
									<li>$300,000</li>
									<li>$325,000</li>
									<li>Any Price</li> -->
								</ol>
							</li>
						</ul>
					</li>

					<li class='market-block'>
						<select name="market" id="markets">
							<option value="lou">Louisville</option>
							<option value="sind">Southern Indiana</option>
							<option value="lex">Lexington</option>
							<option value="nky">Northern Kentucky</option>
						</select>
					</li>
					
				</ul>
			</nav>

		</div>
		
	</div>
 
	<div class="map-search-container">

		<div class='sidebar-loader'>
			<img src="<?php bloginfo('template_directory'); ?>/images/purple-original-loading-gif-large.gif" alt="">
		</div>

		<div id="map-search" class='map-search m-all t-all d-all cf'>
		</div> 
	</div>
	<aside class="map-search-results-container property-search-sidebar">
		<div class='toolbar'>
			<div class='title-block'> <span id='listings-count'>  </span> 

				<select name="sidebar-sort" id="sidebar-sort">
					<option value="asc">Price: Low to High</option>
					<option value="desc">Price: High to Low</option>					
				</select>
			</div>

		</div>
		<div id='property-search-results'> <!-- Sidebar Template --></div>
	</aside>
	
	<div class='over-map-wrapper'>
		<div class='map-details'>
			<b>Only displaying 200 homes.</b> Search is limited to dimensions of map. Zoom in, or use filters to narrow your search. 
		</div>

		<div id='over-map'></div>
	</div>
</div>

<!-- Exlcusive Property Listings -->
<div class='exclusive-wrapper'></div>



<!-- Template: Exclusive Property -->
<script id='exclusive-property-slider' type='text/x-handlebars-template'>
	<div class="grid-width block-center">
		<div class='exclusive-property-title'>
			Alti exclusive properties
		</div>
	
	<div id='exclusive-slider'>
		{{#each listings}}	
			<div class='exclusive-slide'>
				<a href='/listing/{{mlsId}}' title='{{address.full}} {{address.city}}, {{address.state}} {{address.postalCode}} '>
				<div class='img-bg' style='background-image: url( {{photos.[0]}} );'></div>
				<div class='details'>
					<span class='title'> {{ address.city }} </span>
					<p class='price'> {{currency listPrice }} </p>
					<p> {{ property.bedrooms}} beds, {{ property.bathsFull }} baths, {{squareFeet property.area}}</p>
					<div class='address'>
						<p> {{address.full}} </p>
						<p> {{address.city}} {{address.state}} </p>
					</div>
				</div>
				</a>
			</div>
		
		{{/each}}
		</div>
	</div>
</script>

<!-- Template: Info Window -->
<script id="info-window-template" type="text/x-handlebars-template">
 	<div id="property-modal" class="modal">
		<div class='price-bar'>
			<div class='price'>{{currency listPrice property.type}}</div>
		</div>
		<div id='property-carousel' class='property-carousel'>
			{{#each photos}}
				<div class='photo-slide'>
					<!-- <div class="photo-{@index} photo" style='background-image: url({{this}});'></div> -->
					<img class='photo' data-lazy="{{this}}"/>
				</div>
			{{/each}}
		</div>
		<div class="property-body">
			<div class="col col-half">
				<div class="details-pane">
					<div class="address">
						<div class='street'>{{address.streetNumber}} {{address.streetName}}</div>
						<div class="sub-font-1">{{address.city}}, {{address.state}} {{address.postalCode}}</div>
						<div class="sub-font-1 italic">Beds {{property.bedrooms}}, Baths {{add property.bathsFull property.bathsHalf}}</div>
					</div>
					<ul class="details">
						{{#if listDate }}<li>Listed {{fromNow listDate}}</li>{{/if}}
						{{#if property.area}}<li>{{property.area}} sq. ft.</li>{{/if}}
						{{#if property.subType}}<li>{{subType property.subType}}</li>{{/if}}
						{{#if property.yearBuilt}} <li>Built in {{property.yearBuilt}}</li>{{/if}}
						
						{{#if property.area}}<li>Price/sq. ft.: ${{pricePerFoot listPrice property.area property.type}}</li>{{/if}}
					</ul>
					<div class="property-detail-link">
						<a href='/listing/{{mlsId}}'> More detailed information </a>
					</div>
				</div>
			</div>
			<div class="col col-half">
				<div class="agent-pane">
					<div class='agent-block'>
						<div class="photo">
							<img src='<?php bloginfo("template_directory"); ?>/images/greg-taylor-avatar-small.jpg'>
						</div>
						<div class="agent-details">
							<div class="name">
								Greg Taylor
							</div>
							<div class="title">
								Realtor
							</div>
						</div> <!-- end agent details -->
					</div> <!-- end agent block -->

					<ul>
						<li class="cell-phone">
							<a href='tel:5029667325' title='cell'>
								(502) 966-7325
							</a>
						</li>
						<li class="fax-number">
							<a href='fax:5028050843' title='Fax'>
								(502) 805-0843
							</a>
						</li>
						<li class="email">
							<a href='mailto:info@altirealestate.com' title='Email'>
								info@altirealestate.com
							</a>
						</li>
					</ul>
				</div> <!-- end agent pane -->
			</div>
		</div>
	</div>
</script>


<!-- Template property-search-sidebar-template -->
<script id='property-search-sidebar-template' type="text/x-handlebars-template">



	{{#each sidebar}}
	<div class='sidebar-block animated slideInUp' data-mls-id='{{mlsId}}'>
		<div class='col col-half'>
			<div class="thumbnail-property">
				<img src='{{photos.[0]}}'>
				<span class='num-photos'>
					{{countArray photos}} 
				<span>
			</div>
		</div>
		<div class="col col-half property-details">
			<div class='price'>{{currency listPrice}}</div>
			<div class='sub-font-1 sidebar-street'>{{address.streetNumber}} {{address.streetName}}</div>
			<div class="sub-font-1 italic sidebar-city-state">{{address.city}}, {{address.state}} {{address.postalCode}}</div>
			<div class="sub-font-1 italic bold">Beds {{property.bedrooms}}, Baths {{add property.bathsFull property.bathsHalf}}</div>
			<a href="/listing/{{mlsId}}">MORE</a>
		</div>
	</div>
	{{/each}}
</script>




<?php get_footer(); ?>
