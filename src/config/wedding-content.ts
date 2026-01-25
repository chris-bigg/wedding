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
		time: "12pm",
	},
	venue: {
		name: "Kings Head Hotel",
		address: "24 Market Pl, Cirencester GL7 2NW",
		description: "Kings Head Hotel is a stunning venue nestled at the heart of the historic market town of Cirencester.",
		mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.429!2d-1.9681!3d51.7186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871088b8c0b5a5b%3A0x8e8b8c0b5a5b8c0b!2sKings%20Head%20Hotel%2C%2024%20Market%20Pl%2C%20Cirencester%20GL7%202NW%2C%20UK!5e0!3m2!1sen!2suk!4v1730110000000!5m2!1sen!2suk"
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
		{ time: "11:00", event: "Guests Arrive" },
		{ time: "12:00", event: "Ceremony" },
		{ time: "13:00", event: "Cocktail Hour & Canapés" },
		{ time: "15:00", event: "Dinner Reception" },
		{ time: "17:00", event: "First Dance" },
		{ time: "18:00", event: "Dancing Begins / Party Time" },
		{ time: "22:00", event: "Last Orders" },
		{ time: "23:00", event: "Send-Off/End" },
	],

	// Travel & Location
	travel: {
		driving: "Kings Head Hotel is located on <strong>Market Place</strong> in the heart of Cirencester town centre. The venue is easily accessible by car, with several public car parks nearby.",
		publicTransit: "Cirencester is well-served by local bus routes. The nearest bus stops are on <strong>Market Place</strong> and <strong>Cricklade Street</strong>, both within walking distance of the venue. The nearest train stations are <strong>Kemble</strong> (approximately 4 miles away) and <strong>Swindon</strong> (approximately 15 miles away), with regular bus connections to Cirencester.",
		taxiRideshare: "Yes, it should be easy to get a taxi or rideshare. Kings Head Hotel is in the town centre, and local taxi companies operate in Cirencester. You can request a ride using an app or call a local firm.",
		parking: `<p><strong>No</strong>, there is no visitor parking immediately on-site, but public parking is available nearby.</p>

					<h4 class="font-semibold mb-2 mt-4">Specifics:</h4>
					<ul class="list-disc pl-5 space-y-2">
						<li>The nearest car parks are the <strong>Brewery Car Park</strong> and <strong>Watermoor Car Park</strong>, both within a short walk of Market Place.</li>
						<li><strong>Blue Badge holders</strong> can find designated disabled parking spaces in the town centre car parks.</li>
						<li>Additional parking options include <strong>Castle Street Car Park</strong> and on-street parking (where available).</li>
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
			distance: 7.2, // miles from venue
		},
		{
			name: "The Mooring Post @ The Lock Keepers",
			description: "A unique waterside pub with boutique accommodation along the Gloucester & Sharpness Canal. Combining character, comfort and stunning canal views, it's perfect for those seeking something a little different with excellent food and atmosphere.",
			link: "https://www.themooringpost.co.uk/",
			blockCode: null,
			image: "/images/hotels/lock-keeper.jpg",
			distance: 2.5, // miles from venue
		},
		{
			name: "The New Inn Hotel",
			description: "A charming historic inn in the heart of Gloucester city centre, offering traditional hospitality with modern comforts. Perfect for those who want to be within walking distance of the venue and explore the city's rich history and vibrant dining scene.",
			link: "https://www.thenewinngloucester.co.uk/",
			blockCode: null,
			image: "/images/hotels/new-inn.jpeg",
			distance: 0.3, // miles from venue
		},
		{
			name: "Premier Inn Gloucester (Quayside)",
			description: "For those who prefer being in the heart of the action (and a great deal!), the Premier Inn is the ideal spot. It's located right next to the Gloucester Quays designer outlet shops, the historic docks, and lots of bars and restaurants. It's a quick 10-minute walk to all the quayside buzz.",
			link: "https://www.premierinn.com/gb/en/hotels/england/gloucestershire/gloucester/gloucester-quayside.html",
			blockCode: null,
			image: "/images/hotels/premier-inn.webp",
			distance: 0.6, // miles from venue
		},
		{
			name: "Travelodge Gloucester Quays",
			description: "Budget-friendly accommodation in a prime location next to Gloucester Quays. Modern, comfortable rooms with easy access to the historic docks, shopping outlets, and city centre. Great value for guests looking for affordable convenience.",
			link: "https://www.travelodge.co.uk/hotels/gloucester-quays",
			blockCode: null,
			image: "/images/hotels/travelodge.jpg",
			distance: 0.6, // miles from venue
		},
	],

	// FAQs
	faqs: [
		{
			question: "What is the dress code?",
			answer: "We'd love for everyone to put on their best for our big day! The dress code is Formal Attire. This means a suit and tie for the men, and a beautiful dress, dressy skirt, or smart trouser suit for the women. We want everyone to feel elegant and celebrate in style!",
		},
		{
			question: "Can I bring a plus-one?",
			answer:
				"We unfortunately have limited capacity, so we can only accommodate guests formally listed on your invitation/RSVP.",
		},
		{
			question: "Are children invited?",
			answer:
				"We love your little ones, but this will be an adults-only celebration.",
		},
		{
			question: "When should I RSVP by?",
			answer: null as string | null, // Will be set after object creation
		},
		{
			question: "Is parking available?",
			answer: "No, there is no direct visitor parking on-site. Paid public parking is available nearby at the Brewery Car Park and Watermoor Car Park, both within a short walk of the venue. Additional options include Castle Street Car Park and on-street parking where available.",
		},
	],

	// Gift Registry / Honeymoon
	gift: {
		message:
			"Having you celebrate with us is the greatest gift. Since we've accumulated most of what we need for our home, we'd be incredibly grateful for a contribution towards our dream honeymoon to<br>🇸🇮 Slovenia & 🇭🇷 Croatia.",
		donationUrl: "[The URL for Stripe/PayPal/Honeyfund]",
	},
};

// Set the RSVP deadline in the FAQ answer
const rsvpFaqIndex = weddingContent.faqs.findIndex(faq => faq.question === "When should I RSVP by?");
if (rsvpFaqIndex !== -1) {
	weddingContent.faqs[rsvpFaqIndex].answer = `Please let us know your plans by ${weddingContent.rsvp.deadline}.`;
}
