// Helper function to get the correct image path
const getImagePath = (path: string) => {
	return path;
};

export const weddingContent = {
	// Core Details
	couple: {
		name1: "Feleena",
		name2: "Christopher",
	},
	date: {
		full: "Saturday, 1st August, 2026",
		time: "12pm",
	},
	venue: {
		name: "Kings Head Hotel",
		address: "24 Market Pl, Cirencester GL7 2NW",
		description: "Kings Head Hotel is a stunning venue nestled at the heart of the historic market town of Cirencester.",
		// Embed centred on 24 Market Place, Cirencester (Kings Head Hotel) for accurate pin
		mapUrl: "https://www.google.com/maps?q=24+Market+Place,+Cirencester+GL7+2NW,+UK&output=embed",
		// Get Directions link (from Google Maps Share)
		directionsUrl: "https://maps.app.goo.gl/zLy9PaM4kZRBpbGM8",
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
		content: `<p>We cannot wait for you to join us to witness and celebrate our marriage.</p><p>It will be our eighth year together (on 7 July) and we intend to toast from midday until midnight to many more!</p>`,
	},

	// Schedule
	schedule: [
		{ time: "11:00", event: "Guests Arrive" },
		{ time: "12:00", event: "Ceremony" },
		{ time: "TBC", event: "Canapés" },
		{ time: "TBC", event: "Dinner Reception" },
		{ time: "TBC", event: "First Dance" },
		{ time: "TBC", event: "Dancing Begins / Party Time" },
		{ time: "TBC", event: "Last Orders" },
		{ time: "TBC", event: "Send-Off/End" },
	],

	// Travel & Location
	travel: {
		driving: "Kings Head Hotel is located on <strong>Market Place</strong> in the heart of Cirencester town centre. The venue is easily accessible by car, with several public car parks nearby.",
		publicTransport: "Cirencester is well-served by local bus routes. The nearest bus stops are on <strong>Market Place</strong> and <strong>Cricklade Street</strong>, both within walking distance of the venue. The nearest train stations are <strong>Kemble</strong> (approximately 4 miles away) and <strong>Swindon</strong> (approximately 15 miles away), with regular bus connections to Cirencester.",
		taxi: "Taxis are easy to find in Cirencester. Kings Head Hotel is in the town centre, and local taxi firms operate in the area. You can book in advance or call a local firm on the day.",
		parking: `There is no visitor parking immediately on-site, but public parking is available nearby.</p>

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
			question: "What are the key timings?",
			answer: "You are welcome to use the public bar at the hotel before the ceremony. We recommend arrival from 11.15am. Please ensure that you are seated by 11.45am for our 12 noon ceremony. You will not be able to enter the ceremony room after 11.45am. Festivities end at midnight.",
		},
		{
			question: "What is the dress code?",
			answer: "We'd love everyone to put on their best for our big day! The dress code is formal attire — suit and tie for men; dresses, skirts or trouser suits for women.",
		},
		{
			question: "Can I bring a date?",
			answer: "We regret that we are limited on numbers and all guests are named on the invite.",
		},
		{
			question: "Can I bring my children?",
			answer: "Whilst we adore all our family and friend's children, this is an adult only celebration.",
		},
		{
			question: "Is the wedding indoors or outdoors?",
			answer: "The ceremony will be indoors but there will be a terrace for drinks.",
		},
		{
			question: "Can I take photographs with my phone/camera?",
			answer: "Please do not take photographs during the ceremony but feel free to take photographs and videos over the rest of the day. We will be thrilled to see them.",
		},
		{
			question: "When should I RSVP by?",
			answer: null as string | null, // Will be set after object creation
		},
		{
			question: "Who should I call with questions?",
			answer: "Please contact Feleena at 07977291638 or Chris at 07584032612.",
		},
	],

	// Gift Registry / Honeymoon
	gift: {
		message:
			"Having you celebrate with us is the greatest gift. However, if you would like to give a gift we'd be incredibly grateful for a contribution towards our dream honeymoon to Italy, Slovenia and Croatia (since we have accumulated most of what we need for our home).",
		donationUrl: "[The URL for Stripe/PayPal/Honeyfund]",
	},
};

// Set the RSVP deadline in the FAQ answer
const rsvpFaqIndex = weddingContent.faqs.findIndex(faq => faq.question === "When should I RSVP by?");
if (rsvpFaqIndex !== -1) {
	weddingContent.faqs[rsvpFaqIndex].answer = `Please let us know your plans by ${weddingContent.rsvp.deadline}.`;
}
