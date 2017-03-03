import modal from './modal.min';

function About ($) {


	// Open up a new Modal for everytime someone clicks on a
	$('.tooltip').on('click', function(e) {
		var $this = $(this);

		var type = $this.data('type');
		var data = {};
		var copyright = 'Copyright NATIONAL ASSOCIATION OF REALTORS®. Reprinted with permission.';
		var copyright_charfen = 'Copyright 2016 Charfen Institute. Reprinted with permission.';

		switch(type) {
			case 'crs':
				data.title = 'Certified Residential Specialists';
				data.desc = 'The CRS designation is the highest credential awarded to residential sales agents, managers, and brokers.';
				data.copy = copyright;
				break;

			case 'abr':
				data.title = 'Accredited Buyer Representatives'
				data.desc = "The Accredited Buyer's Representative (ABR®) designation is designed for real estate buyer agents who focus on working directly with buyer­-clients at every stage of the home­-buying process.";
				data.copy = copyright;
				break;

			case 'sres':
				data.title = 'Senior Real Estate Specialists'
				data.desc = "The Seniors Real Estate Specialist® (SRES®) designation is for REALTORS® who want to be able to meet the special needs of maturing Americans when selling, buying, relocating, or refinancing residential or investment properties.";
				data.copy = copyright;
				break;

			case 'cdpe':
				data.title = 'Certified Distressed Property Experts'
				data.desc = "A Certified Distressed Property Expert® (CDPE) has a thorough understanding of complex issues in today’s turbulent real estate industry and knowledge of foreclosure avoidance options available to homeowners. CDPEs can provide solutions, specifically short sales, for homeowners facing market hardships.";
				data.copy = copyright_charfen;
				break;

			case 'ssfr':
				data.title = 'Short-sale Foreclosure Representatives'
				data.desc = "The SFR® certification teaches real estate professionals to work with distressed sellers and the finance, tax, and legal professionals who can help them, qualify sellers for short sales, develop a short sale package, negotiate with lenders, safeguard your commission, limit risk, and protect buyers.";
				data.copy = copyright;
				break;

			case 'mrp':
				data.title = 'Military Relocation Professionals'
				data.desc = "NAR's Military Relocation Professional certification focuses on educating real estate professionals about working with current and former military service members to find housing solutions that best suit their needs and take full advantage of military benefits and support.";
				data.copy = copyright;
				break;

			case 'ba':
				data.title = 'Broker Associates'
				data.desc = "A licensed broker whose license is held by another broker. An associate broker qualifies to be a real estate broker but still works for and is supervised by another broker. Associate brokers are sometimes called broker-associates, broker-salespersons or affiliate brokers.";
				break;

			case 'cere':
				data.title = 'Certified Executive Relocation Experts'
				data.desc = "Being awarded the Certified Relocation Professional (CRP®) designation is a highly regarded recognition. It acknowledges that one has achieved extensive and useful knowledge in every aspect of US domestic employee relocation. It's bestowed upon those who qualify, via once-per-year examinations, presented and administered by the industry organization: the Worldwide Employee Relocation Council (Worldwide ERC®).";
				break;

			case 'gorei':
				data.title = 'Graduates of Real Estate Institute'
				data.desc = "REALTORS® with the GRI designation have in­depth training in legal and regulatory issues, technology, professional standards, and the sales process. Earning the designation is a way to stand out to prospective buyers and sellers as a professional with expertise in these areas.";
				data.copy = copyright;
				break;

			case 'rene':
				data.title = 'Real Estate Negotiation Experts'
				data.desc = "This certification is for real estate professionals who want to sharpen their negotiation skills. The RENE certification program gives REALTORS® the tips and tools they need to be skillful advocates for their clients.";
				data.copy = copyright;
				break;
				
		}

		// Use our Handlebars Template and append to page
		var source = $("#credential-window-template").html();
		var template = Handlebars.compile(source);
		$('#modal-el').append(template(data));

 		$('#credential-modal').modal();
	})

	


	

}

export default About;