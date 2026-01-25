import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
	const lenisRef = useRef<Lenis | null>(null);
	const forceTopRafRef = useRef<number | null>(null);
	const isInitializingRef = useRef(true);

	useEffect(() => {
		// Scroll to top on initial load (before Lenis initializes)
		if (typeof window !== 'undefined' && window.history.scrollRestoration) {
			window.history.scrollRestoration = 'manual';
		}
		
		// Remove hash from URL to prevent browser from scrolling to it
		if (window.location.hash) {
			// Replace state without hash but keep URL clean
			window.history.replaceState(null, '', window.location.pathname + window.location.search);
		}
		
		// Force scroll to top multiple times to catch any race conditions
		window.scrollTo(0, 0);
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		
		// Monitor and force scroll to top during initialization
		const forceTop = () => {
			if (isInitializingRef.current) {
				const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
				if (currentScroll > 0) {
					window.scrollTo(0, 0);
					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
				}
				forceTopRafRef.current = requestAnimationFrame(forceTop);
			}
		};
		forceTopRafRef.current = requestAnimationFrame(forceTop);
		
		// Initialize Lenis
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			direction: 'vertical',
			smooth: true,
			smoothTouch: false, // Disable on touch devices for better mobile experience
		});
		lenisRef.current = lenis;

		// Force Lenis to scroll to top immediately
		lenis.scrollTo(0, { immediate: true });
		
		// Keep monitoring scroll position for a longer period to catch late scrolls
		const stopForceTop = setTimeout(() => {
			isInitializingRef.current = false;
			if (forceTopRafRef.current) {
				cancelAnimationFrame(forceTopRafRef.current);
				forceTopRafRef.current = null;
			}
		}, 500);

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
			clearTimeout(stopForceTop);
			if (forceTopRafRef.current) {
				cancelAnimationFrame(forceTopRafRef.current);
			}
			document.removeEventListener('click', handleAnchorClick);
			isInitializingRef.current = false;
			lenis.destroy();
		};
	}, []);

	return null;
}
