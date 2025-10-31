// Helper function to get the correct image path
const getImagePath = (path: string) => {
	return path;
};

export const weddingContent = {
	// Core Details
	couple: {
		name1: "Chris",
		name2: "Feleena",
	},
	date: {
		full: "Saturday, August 1st, 2026",
		time: "1pm",
	},
	venue: {
		name: "Blackfriars Priory",
		address: "Blackfriars Priory, Ladybellegate St, Gloucester GL1 2HN",
		description: "Blackfriars is a stunning example of a 13th century medieval Priory site, nestled at the heart of the waterside City of Gloucester.",
	mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.429!2d-2.2487749!3d51.8643905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487106653ae895d5%3A0x8492fffdb15df426!2sBlackfriars%20Priory!5e0!3m2!1sen!2suk!4v1730110000000!5m2!1sen!2suk"
	},
	rsvp: {
		deadline: "01/05/2026",
	},
	contact: {
		email: "christopherbigg@gmail.com",
	},

	// The Story
	story: {
		title: "Our Story",
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
	},

	// Schedule
	schedule: [
		{ time: "12:00", event: "Guests Arrive" },
		{ time: "13:00", event: "Ceremony" },
		{ time: "14:00", event: "Cocktail Hour & Canapés" },
		{ time: "16:00", event: "Dinner Reception" },
		{ time: "18:00", event: "First Dance" },
		{ time: "19:00", event: "Dancing Begins / Party Time" },
		{ time: "23:00", event: "Last Orders" },
		{ time: "00:00", event: "Send-Off/End" },
	],

	// Travel & Location
	travel: {
		driving: "The Priory is located on <strong>Blackfriars Lane</strong>, off <strong>Ladybellegate Street</strong> in Gloucester city centre. The main entrance has a small curb, but a temporary ramp is available when the site is open to the public. You'll likely need to use nearby public car parks.",
		publicTransit: "The nearest bus stops are on <strong>Ladybellegate Street (Stop Code gloawtat, near Blackfriars Priory)</strong> and the main <strong>Gloucester Train Station</strong> is approximately a 10-minute walk.",
		taxiRideshare: "Yes, it should be easy to get a taxi or rideshare. The Priory is in the city centre, and local taxi companies <strong>(e.g., Five Star Taxis)</strong> operate in Gloucester. UberX is also available in the Gloucester area as a rideshare option. You can request a ride using an app or call a local firm.",
		parking: `<p><strong>No</strong>, there is no visitor parking immediately on-site, but charged public parking is available next door.</p>

					<h4 class="font-semibold mb-2 mt-4">Specifics:</h4>
					<ul class="list-disc pl-5 space-y-2">
						<li>The nearest car parks are the <strong>Ladybellegate Street Car Park</strong> (a Gloucester City Council car park) and the <strong>NCP Gloucester Blackfriars</strong> car park. Both are paid parking.</li>
						<li><strong>Blue Badge holders</strong> can park free of charge for up to 3 hours in the <strong>Ladybellegate Street</strong> Council car park (must display badge and set the time clock). The NCP car park does not offer free parking for Blue Badge holders.</li>
						<li>Other nearby options include the <strong>Longsmith Street</strong> car park and parking at <strong>Gloucester Quays</strong>.</li>
					</ul>`,
	},

	// Accommodation
	accommodation: [
		{
			name: "Hatherley Manor Hotel & Spa",
			description: "The Hatherley Manor is a beautiful 17th-century house set in the countryside, perfect if you're looking to make a full weekend of it. It offers a luxury spa, an indoor pool, and a highly-rated restaurant. It's about a 15-minute taxi ride to the main attractions in Gloucester.",
			link: "https://hatherleymanor.com/",
			blockCode: null,
			image: "/images/hotels/hatherley-manor-hotel.jpeg",
		},
		{
			name: "Premier Inn Gloucester (Quayside)",
			description: "For those who prefer being in the heart of the action (and a great deal!), the Premier Inn is the ideal spot. It's located right next to the Gloucester Quays designer outlet shops, the historic docks, and lots of bars and restaurants. It's a quick 10-minute walk to all the quayside buzz.",
			link: "https://www.premierinn.com/gb/en/hotels/england/gloucestershire/gloucester/gloucester-quayside.html",
			blockCode: null,
			image: "/images/hotels/premier-inn.webp",
		},
		{
			name: "The New Inn Hotel",
			description: "A charming historic inn in the heart of Gloucester city centre, offering traditional hospitality with modern comforts. Perfect for those who want to be within walking distance of the venue and explore the city's rich history and vibrant dining scene.",
			link: "https://www.thenewinngloucester.co.uk/",
			blockCode: null,
			image: "/images/hotels/new-inn.jpeg",
		},
		{
			name: "Travelodge Gloucester Quays",
			description: "Budget-friendly accommodation in a prime location next to Gloucester Quays. Modern, comfortable rooms with easy access to the historic docks, shopping outlets, and city centre. Great value for guests looking for affordable convenience.",
			link: "https://www.travelodge.co.uk/hotels/gloucester-quays",
			blockCode: null,
			image: "/images/hotels/travelodge.jpg",
		},
		{
			name: "The Mooring Post @ The Lock Keepers",
			description: "A unique waterside pub with boutique accommodation along the Gloucester & Sharpness Canal. Combining character, comfort and stunning canal views, it's perfect for those seeking something a little different with excellent food and atmosphere.",
			link: "https://www.themooringpost.co.uk/",
			blockCode: null,
			image: "/images/hotels/lock-keeper.jpg",
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
			"Having you celebrate with us is the greatest gift. Since we've accumulated most of what we need for our home, we'd be incredibly grateful for a contribution towards our dream honeymoon to 🇸🇮 Slovenia & 🇭🇷 Croatia.",
		donationUrl: "[The URL for Stripe/PayPal/Honeyfund]",
	},
};
