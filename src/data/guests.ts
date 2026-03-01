import type { GuestData } from '../types/guest';

// Import guest list stub file (committed to repo, empty by default)
// For production: Use GUEST_LIST environment variable in Netlify
// For local dev: Use GUEST_LIST in .env file
import { GUEST_LIST_DATA as STUB_DATA } from './guests-data.stub';

// Read guest list from imported data or environment variable
export function getGuestList(): Record<string, GuestData> {
	// First priority: environment variable (for production builds like Netlify)
	// This is checked first because it's the most reliable for production
	const guestListEnv = import.meta.env.GUEST_LIST;
	if (guestListEnv && typeof guestListEnv === 'string' && guestListEnv.trim().length > 0) {
		try {
			const parsed = JSON.parse(guestListEnv);
			if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
				return parsed;
			}
		} catch {
			// Parse failed; will fall back to stub or empty object
		}
	}
	
	// Second priority: use stub file (empty in production, but exists in repo)
	// This ensures the import doesn't fail, but won't have data
	if (STUB_DATA && Object.keys(STUB_DATA).length > 0) {
		return STUB_DATA;
	}
	
	console.warn('[guests.ts] ⚠️  No guest list found. Set GUEST_LIST environment variable in Netlify.');
	return {};
}

// For client-side components, this will be passed as a prop
// This export is kept for backward compatibility but should be replaced with props
export const GUEST_LIST: Record<string, GuestData> = {};
