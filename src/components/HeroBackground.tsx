import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BASE_URL = import.meta.env.BASE_URL;

const images = [
	`${BASE_URL}/images/us/1.jpg`,
	`${BASE_URL}/images/us/2.jpg`,
	`${BASE_URL}/images/us/3.jpg`,
	`${BASE_URL}/images/us/4.jpg`,
	`${BASE_URL}/images/us/5.jpg`,
	`${BASE_URL}/images/us/6.jpg`,
	`${BASE_URL}/images/us/7.jpg`
];

export default function HeroBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const currentIndex = useRef(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const slides = containerRef.current.querySelectorAll('.carousel-slide');
		if (slides.length === 0) return;

		// Set initial state: first image visible, rest hidden
		gsap.set(slides, { opacity: 0 });
		gsap.set(slides[0], { opacity: 1 });

		// Start zoom on first image immediately
		const firstImg = slides[0].querySelector('img');
		if (firstImg) {
			gsap.fromTo(
				firstImg,
				{ scale: 1 },
				{
					scale: 1.1,
					duration: 10,
					ease: 'linear',
				}
			);
		}

	const animate = () => {
		const current = slides[currentIndex.current];
		const next = slides[(currentIndex.current + 1) % slides.length];
		const currentImg = current.querySelector('img');
		const nextImg = next.querySelector('img');

		// Fade out current with slight zoom
		gsap.to(current, {
			opacity: 0,
			duration: 1.5,
			ease: 'power2.inOut',
		});

		if (currentImg) {
			gsap.to(currentImg, {
				scale: 1.1,
				duration: 10,
				ease: 'linear',
			});
		}

		// Fade in next and start zoom
		gsap.to(next, {
			opacity: 1,
			duration: 1.5,
			ease: 'power2.inOut',
		});

		if (nextImg) {
			gsap.fromTo(
				nextImg,
				{ scale: 1 },
				{
					scale: 1.1,
					duration: 10,
					ease: 'linear',
				}
			);
		}

		currentIndex.current = (currentIndex.current + 1) % slides.length;
	};

	const interval = setInterval(animate, 10000);

	return () => {
		clearInterval(interval);
	};
	}, []);

	return (
		<div className="absolute inset-0 z-0">
			<div ref={containerRef} className="absolute inset-0">
				{images.map((image, index) => (
					<div key={index} className="carousel-slide absolute inset-0">
						<img
							src={image}
							alt="Wedding photo"
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
			{/* Overlay for image visibility */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#F5EDE0]/70 via-[#E8DCC8]/60 to-[#F5EDE0]/70 dark:from-stone-900/80 dark:via-stone-900/70 dark:to-stone-900/80"></div>
			{/* Center vignette for text area */}
			<div className="absolute inset-0 bg-gradient-radial from-[#F5EDE0]/40 via-[#E8DCC8]/50 to-[#D4C5A9]/60 dark:from-stone-900/50 dark:via-stone-900/60 dark:to-stone-900/70"></div>
			{/* Darker radial vignette from edges */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.3)_100%)]"></div>
		</div>
	);
}
