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

import { getGuestList } from './guests';

export type GuestViewType = 'day' | 'evening' | 'general';

/**
 * Derive guest view tier from URL (type and id params).
 * Day (food, full FAQs, day schedule) only when type=day AND valid id.
 * Evening works standalone (type=evening). Anything else = fallback.
 */
export function getGuestViewType(): GuestViewType {
	if (typeof window === 'undefined') return 'evening';
	const params = new URLSearchParams(window.location.search);
	const type = params.get('type');
	const id = params.get('id');
	const list = getGuestList();
	const validId = id && list && Object.prototype.hasOwnProperty.call(list, id);
	if (type === 'day' && validId) return 'day';
	if (type === 'evening') return 'evening';
	return 'evening'; // fallback: wrong/missing type or id
}
