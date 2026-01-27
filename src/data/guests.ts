export interface GuestData {
	names: string[];
	email?: string;
}

// Import guest list - always import stub (committed), optionally override with gitignored file
// For local dev: guests-data.ts (gitignored) can override the stub
// For production: guests-data.stub.ts (committed) is empty, use GUEST_LIST env var
import { GUEST_LIST_DATA as STUB_DATA } from './guests-data.stub';

let GUEST_LIST_DATA: Record<string, GuestData> = STUB_DATA;

// Try to import from gitignored file (local development only - optional)
// This will fail in production builds, which is expected
try {
	const { GUEST_LIST_DATA: localData } = await import('./guests-data');
	if (localData && Object.keys(localData).length > 0) {
		GUEST_LIST_DATA = localData;
	}
} catch {
	// File doesn't exist - that's okay, use stub or env var
}

// Read guest list from imported data or environment variable
export function getGuestList(): Record<string, GuestData> {
	// First try: use imported data file (local dev uses guests-data.ts, prod uses stub)
	if (GUEST_LIST_DATA && Object.keys(GUEST_LIST_DATA).length > 0) {
		if (import.meta.env.DEV) {
			console.log(`[guests.ts] Loaded ${Object.keys(GUEST_LIST_DATA).length} guests from data file`);
		}
		return GUEST_LIST_DATA;
	}
	
	// Fallback: environment variable (for production builds like Netlify)
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
		console.warn('[guests.ts] No guest list found. Set GUEST_LIST environment variable for production builds.');
	}
	return {};
}

// For client-side components, this will be passed as a prop
// This export is kept for backward compatibility but should be replaced with props
export const GUEST_LIST: Record<string, GuestData> = {};
