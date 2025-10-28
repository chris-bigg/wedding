export const weddingContent = {
	// Core Details
	couple: {
		name1: "Chris",
		name2: "Feleena",
	},
	date: {
		full: "Saturday, August 1st, 2025",
		time: "1pm",
	},
	venue: {
		name: "Blackfriars Priory",
		address: "Blackfriars Priory, Ladybellegate St, Gloucester GL1 2HN",
		description: "Blackfriars is a stunning example of a 13th century medieval Priory site, nestled at the heart of the waterside City of Gloucester.",
		mapUrl: "https://maps.app.goo.gl/yu8WV13iY1R9aehn6", // Replace with actual Google Maps link
	},
	rsvp: {
		deadline: "TBC",
	},
	contact: {
		email: "tbc@gmail.com",
	},

	// The Story
	story: {
		title: "Our Story",
		content: `[A short bio of the couple, proposal story, and engagement photos.]`,
	},

	// Schedule
	schedule: [
		{ time: "[Time]", event: "Guests Arrive" },
		{ time: "[Time]", event: "Ceremony" },
		{ time: "[Time]", event: "Cocktail Hour & Canapés" },
		{ time: "[Time]", event: "Dinner Reception" },
		{ time: "[Time]", event: "First Dance" },
		{ time: "[Time]", event: "Dancing Begins / Party Time" },
		{ time: "[Time]", event: "Last Orders" },
		{ time: "[Time]", event: "Send-Off/End" },
	],

	// Travel & Location
	travel: {
		driving: "The Priory is located on Blackfriars Lane, off Ladybellegate Street in Gloucester city centre. The main entrance has a small curb, but a temporary ramp is available when the site is open to the public. You'll likely need to use nearby public car parks.",
		publicTransit: "The nearest bus stops are on Ladybellegate Street (Stop Code gloawtat, near Blackfriars Priory) and the main Gloucester Train Station is approximately a 10-minute walk.",
		taxiRideshare: "Yes, it should be easy to get a taxi or rideshare. The Priory is in the city centre, and local taxi companies (e.g., Five Star Taxis) operate in Gloucester. UberX is also available in the Gloucester area as a rideshare option. You can request a ride using an app or call a local firm.",
		parking: `No, there is no visitor parking immediately on-site, but charged public parking is available next door.
Specifics:
* The nearest car parks are the Ladybellegate Street Car Park (Gloucester City Council) and the NCP Gloucester Blackfriars car park. Both are paid parking.
* Blue Badge holders can park free of charge for up to 3 hours in the Ladybellegate Street Council car park (must display badge and set the time clock). The NCP car park does not offer free parking for Blue Badge holders.
* Other nearby options include the Longsmith Street car park and parking at Gloucester Quays.`,
	},

	// Accommodation
	accommodation: [
		{
			name: "[Hotel 1 Name]",
			link: "[Booking Link]",
			blockCode: "[Block Code if applicable]",
		},
		{
			name: "[Hotel 2 Name]",
			link: "[Booking Link]",
			blockCode: null,
		},
	],

	// FAQs
	faqs: [
		{
			question: "What is the dress code?",
			answer: "[e.g., Black Tie Optional, Cocktail Attire, or Smart Casual]",
		},
		{
			question: "Can I bring a plus-one?",
			answer:
				"We unfortunately have limited capacity, so we can only accommodate guests formally listed on your invitation/RSVP.",
		},
		{
			question: "Are children invited?",
			answer:
				"[Yes/No - if No: We love your little ones, but this will be an adults-only celebration.]",
		},
		{
			question: "When should I RSVP by?",
			answer: "Please let us know your plans by [Date].",
		},
		{
			question: "Is parking available?",
			answer: "[Yes/No, give specifics]",
		},
	],

	// Gift Registry / Honeymoon
	gift: {
		message:
			"Having you celebrate with us is the greatest gift. Since we've accumulated most of what we need for our home, we'd be incredibly grateful for a contribution towards our dream honeymoon to [Location].",
		donationUrl: "[The URL for Stripe/PayPal/Honeyfund]",
	},
};
