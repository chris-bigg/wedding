import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const images = [
	"/images/us/1.jpg",
	"/images/Collage.jpg"
];

export default function HeroBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const hasTransitioned = useRef(false);

	useEffect(() => {
		if (!containerRef.current) return;

		const slides = containerRef.current.querySelectorAll('.carousel-slide');
		if (slides.length === 0) return;

		// Set initial state: first image visible, rest hidden
		gsap.set(slides, { opacity: 0 });
		gsap.set(slides[0], { opacity: 1, zIndex: 1 });
		
		// Set initial state for collage - hidden behind, zoomed and blurred
		const collageImg = slides[1]?.querySelector('img');
		if (collageImg) {
			gsap.set(slides[1], { zIndex: 0 });
			gsap.set(collageImg, { scale: 1.3, filter: 'blur(20px)' });
		}

		// Start zoom on first image immediately
		const firstImg = slides[0].querySelector('img');
		if (firstImg) {
			gsap.fromTo(
				firstImg,
				{ scale: 1 },
				{
					scale: 1.1,
					duration: 15,
					ease: 'linear',
				}
			);
		}

		const animate = () => {
			// Prevent multiple transitions
			if (hasTransitioned.current) return;
			hasTransitioned.current = true;

			const current = slides[0];
			const next = slides[1];
			const currentImg = current.querySelector('img');
			const nextImg = next.querySelector('img');

			// Create a timeline for synchronized effects
			const tl = gsap.timeline();

			// Set initial state for the collage - start zoomed in and slightly blurred behind
			gsap.set(next, { opacity: 0, zIndex: 0 });
			gsap.set(nextImg, { scale: 1.3, filter: 'blur(20px)' });

			// Cinematic transition: first image zooms out, blurs, and fades
			// while collage zooms in from behind and sharpens
			if (currentImg) {
				tl.to(currentImg, {
					scale: 1.4,
					filter: 'blur(15px)',
					duration: 2,
					ease: 'power2.in',
				}, 0);
			}

			tl.to(current, {
				opacity: 0,
				duration: 2,
				ease: 'power2.in',
			}, 0);

			// Bring collage to front and animate it in
			tl.set(next, { zIndex: 2 }, 0.5);
			tl.to(next, {
				opacity: 1,
				duration: 2,
				ease: 'power2.out',
			}, 0.5);

			if (nextImg) {
				// Collage zooms in from 1.3x to 1.1x (smooth zoom in) and sharpens
				tl.to(nextImg, {
					scale: 1.1,
					filter: 'blur(0px)',
					duration: 2.5,
					ease: 'power2.out',
				}, 0.5);

				// Continue slow zoom forever after transition completes
				tl.to(nextImg, {
					scale: 1.15,
					duration: 1000,
					ease: 'linear',
				}, 3);
			}

			// Ensure first slide stays behind after transition
			tl.set(current, { zIndex: 0 }, 2.5);
		};

		// Show first image for 15 seconds, then transition to collage ONCE
		timeoutRef.current = setTimeout(animate, 15000);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<div className="absolute inset-0 z-0" role="presentation" aria-hidden="true">
			<div ref={containerRef} className="absolute inset-0">
				{images.map((image, index) => (
					<div key={index} className="carousel-slide absolute inset-0">
						<img
							src={image}
							alt=""
							className="w-full h-full object-cover"
							aria-hidden="true"
						/>
					</div>
				))}
			</div>
			{/* Overlay for image visibility - always on top of images */}
			<div className="absolute inset-0 z-10 bg-gradient-to-br from-[#F5EDE0]/60 via-[#E8DCC8]/80 to-[#F5EDE0]/60 dark:from-stone-900/80 dark:via-stone-900/70 dark:to-stone-900/80 pointer-events-none"></div>
			{/* Center vignette for text area */}
			<div className="absolute inset-0 z-10 bg-gradient-radial from-[#F5EDE0]/40 via-[#E8DCC8]/50 to-[#D4C5A9]/60 dark:from-stone-900/50 dark:via-stone-900/60 dark:to-stone-900/70 pointer-events-none"></div>
			{/* Darker radial vignette from edges */}
			<div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>
		</div>
	);
}
