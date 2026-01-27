export interface GuestData {
	names: string[];
	email?: string;
}

// Import guest list from gitignored data file
// This file is in .gitignore so it won't be committed to the repo
import { GUEST_LIST_DATA } from './guests-data';

// Read guest list from gitignored data file or environment variable
export function getGuestList(): Record<string, GuestData> {
	// First try: use imported data file
	if (typeof GUEST_LIST_DATA !== 'undefined' && GUEST_LIST_DATA) {
		if (import.meta.env.DEV) {
			console.log(`[guests.ts] Loaded ${Object.keys(GUEST_LIST_DATA).length} guests from guests-data.ts`);
		}
		return GUEST_LIST_DATA;
	}
	
	// Fallback: try environment variable
	const guestListEnv = import.meta.env.GUEST_LIST;
	if (guestListEnv) {
		try {
			const parsed = JSON.parse(guestListEnv as string);
			if (import.meta.env.DEV) {
				console.log(`[guests.ts] Loaded ${Object.keys(parsed).length} guests from environment variable`);
			}
			return parsed;
		} catch (error) {
			console.error('Failed to parse GUEST_LIST from environment:', error);
		}
	}
	
	if (import.meta.env.DEV) {
		console.warn('[guests.ts] No guest list found. Check guests-data.ts or GUEST_LIST env variable.');
	}
	return {};
}

// For client-side components, this will be passed as a prop
// This export is kept for backward compatibility but should be replaced with props
export const GUEST_LIST: Record<string, GuestData> = {};
