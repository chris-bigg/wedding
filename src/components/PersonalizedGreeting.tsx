import { useState, useEffect } from 'react';
import { getGuestList } from '../utils/guests';
import { getUrlParam } from '../utils/url';
import { formatNames } from '../utils/formatters';

export default function PersonalizedGreeting() {
	const [formattedNames, setFormattedNames] = useState<string>('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const id = getUrlParam('id');
			
			// Wait a tick to ensure script has run
			setTimeout(() => {
				const guestList = getGuestList();

				if (id && guestList[id]) {
					const guestData = guestList[id];
					setFormattedNames(formatNames(guestData.names));
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
				<div
					className="rounded-2xl px-10 py-7 backdrop-blur-xl bg-white/20 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-600/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
				>
					<h2 className="text-4xl md:text-5xl overflow-visible text-center" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 400, lineHeight: 1.3, padding: '0.5rem 0'}}>
						<span
							className="inline-block px-4 bg-clip-text text-transparent"
							style={{
								backgroundImage: 'linear-gradient(to right, #C9C7C1, #E8E6E1, #BAB8B2, #AAA8A2)',
							}}
						>
							Hi {formattedNames}, we can't wait to celebrate with you!
						</span>
					</h2>
				</div>
			</div>
		</section>
	);
}
