import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import CountdownTimer from './CountdownTimer';

interface HeroContentProps {
	dateText: string;
	venueName: string;
}

export default function HeroContent({ dateText, venueName }: HeroContentProps) {
	useEffect(() => {
		// Listen for when the hero title animation completes
		const handleTitleComplete = () => {
			// Animate elements in sequence
			gsap.fromTo(
				'.hero-divider',
				{ opacity: 0, scaleX: 0 },
				{ opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
			);
			
			gsap.fromTo(
				'.hero-text',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
			);
			
			gsap.fromTo(
				'.hero-countdown',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
			);
			
			gsap.fromTo(
				'.hero-rsvp',
				{ opacity: 0, scale: 0.8 },
				{ opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.1 }
			);
		};

		window.addEventListener('heroTitleComplete', handleTitleComplete, { once: true });

		return () => {
			window.removeEventListener('heroTitleComplete', handleTitleComplete);
		};
	}, []);

	return (
		<>
			<div className="hero-divider h-px w-32 bg-gradient-to-r from-transparent via-stone-600 to-transparent mx-auto my-10 opacity-0" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }}></div>
			
			<div className="hero-text space-y-4 mb-10 opacity-0">
				<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-normal text-stone-700 dark:text-stone-200 tracking-wide uppercase" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))', letterSpacing: '0.05em' }}>
					{dateText}
				</p>
				<p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-light text-stone-700 dark:text-stone-300 tracking-wider uppercase" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))', letterSpacing: '0.1em' }}>
					{venueName}
				</p>
			</div>
			
			<div className="hero-countdown mt-8 opacity-0">
				<CountdownTimer />
			</div>
			
			<div className="hero-rsvp mt-8 opacity-0">
				<a 
					href="#rsvp" 
					className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
					style={{ filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25)) drop-shadow(0 3px 6px rgba(255, 255, 255, 0.8))' }}
				>
					RSVP Now
				</a>
			</div>
		</>
	);
}
