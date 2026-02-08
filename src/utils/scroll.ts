/**
 * Prevent browser scroll restoration on page load
 */
export function preventScrollRestoration(): void {
	if (typeof window !== 'undefined' && window.history.scrollRestoration) {
		window.history.scrollRestoration = 'manual';
	}
}

/**
 * Remove hash from URL without triggering navigation
 */
export function removeHashFromUrl(): void {
	if (typeof window === 'undefined') return;
	
	if (window.location.hash) {
		window.history.replaceState(null, '', window.location.pathname + window.location.search);
	}
}

/**
 * Scroll to top of page immediately
 */
export function scrollToTop(): void {
	if (typeof window === 'undefined') return;
	
	window.scrollTo(0, 0);
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}

/**
 * Initialize scroll behavior - prevents restoration and scrolls to top
 */
export function initScrollBehavior(): void {
	preventScrollRestoration();
	removeHashFromUrl();
	scrollToTop();
}
