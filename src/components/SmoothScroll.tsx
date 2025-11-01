import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
	useEffect(() => {
		// Scroll to top on initial load (before Lenis initializes)
		if (typeof window !== 'undefined' && window.history.scrollRestoration) {
			window.history.scrollRestoration = 'manual';
		}
		
		// Ensure page starts at top
		window.scrollTo(0, 0);
		
		// Initialize Lenis
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			direction: 'vertical',
			smooth: true,
			smoothTouch: false, // Disable on touch devices for better mobile experience
		});

		// Scroll to top after Lenis initializes (in case browser restoration happened)
		lenis.scrollTo(0, { immediate: true });

		// Animation frame loop
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Handle anchor link clicks
		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest('a[href^="#"]');
			
			if (anchor && anchor instanceof HTMLAnchorElement) {
				const href = anchor.getAttribute('href');
				if (href && href.startsWith('#')) {
					e.preventDefault();
					const element = document.querySelector(href);
					if (element) {
						lenis.scrollTo(element, {
							duration: 0.8,
							offset: -60, // Account for fixed nav
						});
					}
				}
			}
		};

		document.addEventListener('click', handleAnchorClick);

		// Cleanup
		return () => {
			document.removeEventListener('click', handleAnchorClick);
			lenis.destroy();
		};
	}, []);

	return null;
}
