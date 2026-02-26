/**
 * Get a URL parameter value
 */
export function getUrlParam(param: string): string | null {
	if (typeof window === 'undefined') return null;
	const params = new URLSearchParams(window.location.search);
	return params.get(param);
}

/**
 * Remove a URL parameter and update the browser history
 */
export function removeUrlParam(param: string): void {
	if (typeof window === 'undefined') return;
	const params = new URLSearchParams(window.location.search);
	params.delete(param);
	const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
	window.history.replaceState({}, '', newUrl);
}

/**
 * Remove multiple URL parameters and update the browser history
 */
export function removeUrlParams(params: string[]): void {
	if (typeof window === 'undefined') return;
	const urlParams = new URLSearchParams(window.location.search);
	params.forEach(param => urlParams.delete(param));
	const newUrl = window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : '');
	window.history.replaceState({}, '', newUrl);
}

export type GuestViewType = 'day' | 'evening' | 'general';

/**
 * Derive guest view tier from URL (type and id params).
 * Used for schedule visibility and RSVP form (food fields / validation).
 */
export function getGuestViewType(): GuestViewType {
	if (typeof window === 'undefined') return 'general';
	const params = new URLSearchParams(window.location.search);
	const type = params.get('type');
	const id = params.get('id');
	if (type === 'evening') return 'evening';
	if (type === 'day') return 'day';
	if (id) return 'day'; // backward compatibility: id without type = day
	return 'general';
}
