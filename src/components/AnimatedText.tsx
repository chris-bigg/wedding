import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
	text: string;
	type?: 'split' | 'typewriter' | 'glitch';
	className?: string;
}

export default function AnimatedText({
	text,
	type = 'split',
	className = '',
}: AnimatedTextProps) {
	const containerRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const element = containerRef.current;
		
		// Properly split text to handle emojis and Unicode characters
		// Use Intl.Segmenter for proper grapheme cluster splitting (handles emojis correctly)
		let chars: string[];
		if ('Segmenter' in Intl) {
			// Modern browsers - use Intl.Segmenter for proper Unicode handling
			const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
			chars = Array.from(segmenter.segment(text), (segment) => segment.segment);
		} else {
			// Fallback: use spread operator which works for most emojis
			chars = [...text];
		}

		// Clear existing content
		element.innerHTML = '';

		// Create spans for each character (including emojis)
		const charSpans = chars.map((char, index) => {
			const span = document.createElement('span');
			// Handle spaces and preserve emojis
			span.textContent = char === ' ' ? '\u00A0' : char;
			span.style.display = 'inline-block';
			span.style.opacity = '0';
			
			// Ensure emojis use a font that supports them (fallback to system emoji font)
			// Check if character is an emoji (outside basic ASCII)
			if (char.charCodeAt(0) > 127 || /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(char)) {
				span.style.fontFamily = 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, emoji, sans-serif';
			}
			
			element.appendChild(span);
			return span;
		});

		if (type === 'split') {
			// Split animation - each character rotates and scales in
			gsap.fromTo(
				charSpans,
				{
					opacity: 0,
					rotateX: -90,
					rotateY: 0,
					scale: 0.5,
					y: 50,
				},
				{
					opacity: 1,
					rotateX: 0,
					rotateY: 0,
					scale: 1,
					y: 0,
					duration: 0.6,
					ease: 'back.out(1.7)',
					stagger: {
						amount: 1.2,
						from: 'start',
					},
				}
			);
		} else if (type === 'typewriter') {
			// Typewriter effect with a twist
			charSpans.forEach((span, index) => {
				gsap.to(span, {
					opacity: 1,
					duration: 0.05,
					delay: index * 0.08,
					ease: 'none',
					onStart: () => {
						// Add a subtle scale effect
						gsap.fromTo(
							span,
							{ scale: 1.5 },
							{
								scale: 1,
								duration: 0.3,
								ease: 'back.out(2)',
							}
						);
					},
				});
			});
		} else if (type === 'glitch') {
			// Glitch/morph effect
			charSpans.forEach((span, index) => {
				gsap.fromTo(
					span,
					{
						opacity: 0,
						x: () => gsap.utils.random(-20, 20),
						y: () => gsap.utils.random(-20, 20),
						rotation: () => gsap.utils.random(-10, 10),
						filter: 'blur(10px)',
					},
					{
						opacity: 1,
						x: 0,
						y: 0,
						rotation: 0,
						filter: 'blur(0px)',
						duration: 0.8,
						ease: 'power3.out',
						delay: index * 0.05,
					}
				);
			});
		}
	}, [text, type]);

	return <span ref={containerRef} className={className} />;
}

