import { useState, useEffect } from 'react';

interface GuestData {
	names: string[];
	email?: string;
}

const formatNames = (names: string[]): string => {
	if (names.length === 0) return '';
	if (names.length === 1) return names[0];
	if (names.length === 2) return `${names[0]} & ${names[1]}`;
	const allButLast = names.slice(0, -1).join(', ');
	return `${allButLast} & ${names[names.length - 1]}`;
};

// Get guest list from window global (injected by Astro)
function getGuestList(): Record<string, GuestData> {
	if (typeof window !== 'undefined') {
		const guestList = (window as any).__GUEST_LIST__;
		if (guestList) {
			return guestList;
		}
		if (import.meta.env.DEV) {
			console.warn('window.__GUEST_LIST__ not found. Check if script tag is rendering correctly.');
		}
	}
	return {};
}

export default function PersonalizedGreeting() {
	const [formattedNames, setFormattedNames] = useState<string>('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const id = params.get('id');
			
			// Wait a tick to ensure script has run
			setTimeout(() => {
				const guestList = getGuestList();
				
				// Debug logging
				console.log('PersonalizedGreeting - ID:', id);
				console.log('PersonalizedGreeting - window.__GUEST_LIST__:', (window as any).__GUEST_LIST__);
				console.log('PersonalizedGreeting - Guest list keys:', Object.keys(guestList));
				console.log('PersonalizedGreeting - Guest list has ID?', id ? guestList[id] : false);
				
				if (id && guestList[id]) {
					const guestData = guestList[id];
					setFormattedNames(formatNames(guestData.names));
				} else if (id) {
					console.warn('Guest list is empty or ID not found. Guest list:', guestList);
					console.warn('Available keys:', Object.keys(guestList));
				}
			}, 0);
		}
	}, []);

	if (!formattedNames) {
		return null;
	}

	return (
		<section className="py-12 px-4 bg-gradient-to-br from-[#F2F4F0]/50 via-[#E6E8E2]/40 to-green-50/40 dark:from-stone-900/30 dark:via-stone-900/20 dark:to-stone-950/30">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl mb-4 overflow-visible font-bold" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 600, lineHeight: 1.3, padding: '0.5rem 0'}}>
					<span className="inline-block bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent px-4">
						Hi {formattedNames}, we can't wait to celebrate with you!
					</span>
				</h2>
			</div>
		</section>
	);
}
