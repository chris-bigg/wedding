export interface GuestData {
	names: string[];
	email?: string;
}

export const GUEST_LIST: Record<string, GuestData> = {
	'jon-abby': {
		names: ['Jon', 'Abby'],
	},
	'spence-amanda': {
		names: ['Spence', 'Amanda'],
	},
	'dan-anja': {
		names: ['Dan', 'Anja'],
	},
	'ewan': {
		names: ['Ewan'],
	},
	'barney-carol': {
		names: ['Barney', 'Carol'],
	},
	'ali-gemma': {
		names: ['Ali', 'Gemma'],
	},
	'craig-katie': {
		names: ['Craig', 'Katie'],
	},
};
