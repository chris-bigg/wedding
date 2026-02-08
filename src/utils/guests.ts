import type { GuestData } from '../types/guest';

/**
 * Get guest list from window global (injected by Astro)
 * This is the consolidated client-side utility for accessing guest data
 */
export function getGuestList(): Record<string, GuestData> {
	if (typeof window !== 'undefined' && (window as any).__GUEST_LIST__) {
		return (window as any).__GUEST_LIST__;
	}
	return {};
}
