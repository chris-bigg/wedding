import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroTitleProps {
	name1: string;
	name2: string;
}

export default function HeroTitle({ name1, name2 }: HeroTitleProps) {
	const svgRef = useRef<SVGSVGElement>(null);
	const name1PathRef = useRef<SVGTextElement>(null);
	const andPathRef = useRef<SVGTextElement>(null);
	const name2PathRef = useRef<SVGTextElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDrawn, setIsDrawn] = useState(false);

	useEffect(() => {
		if (!svgRef.current || !name1PathRef.current || !name2PathRef.current || !andPathRef.current) return;

		// Set initial hidden state
		gsap.set([name1PathRef.current, andPathRef.current, name2PathRef.current], {
			opacity: 0,
			scale: 0.8,
			y: 50,
		});

		let scrollTriggerInstance: ScrollTrigger | null = null;

		const animate = () => {
			if (!svgRef.current || !name1PathRef.current || !name2PathRef.current || !andPathRef.current || !containerRef.current) return;

			const tl = gsap.timeline();

			// Elegant fade and scale in for first name
			tl.to(name1PathRef.current, {
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 1.5,
				ease: 'power3.out',
			});

			// "And" text, overlapping slightly with first name
			tl.to(
				andPathRef.current,
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 1.5,
					ease: 'power3.out',
				},
				'-=1' // Start 1s before previous animation ends
			);

			// Second name, overlapping slightly
			tl.to(
				name2PathRef.current,
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 1.5,
					ease: 'power3.out',
					onComplete: () => {
						setIsDrawn(true);
						
						// Dispatch event to signal title animation is complete
						window.dispatchEvent(new CustomEvent('heroTitleComplete'));
						
						// Setup scroll-triggered parallax after reveal
						if (containerRef.current) {
							// Detect mobile devices
							const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
							
							const animation = gsap.to(containerRef.current, {
								scale: 2.5,
								y: 150,
								opacity: 0,
								ease: 'none',
								scrollTrigger: {
									trigger: '#home',
									start: 'top top',
									end: 'bottom top',
									scrub: isMobile ? 0.5 : 1, // Faster scrub on mobile for less lag
									invalidateOnRefresh: true, // Recalculate on orientation change
									fastScrollEnd: isMobile ? true : false, // Better handling of fast scrolling
								},
							});
							scrollTriggerInstance = animation.scrollTrigger as ScrollTrigger;
						}
					},
				},
				'-=1' // Start 1s before previous animation ends
			);
		};

		// Wait for splash screen to complete, then ensure Auteur Script is loaded before animating
		// (SVG text can lock in fallback font if the webfont isn't ready when first painted)
		const handleSplashComplete = async () => {
			try {
				await document.fonts.load('160px "Auteur Script"');
			} catch {
				// Proceed anyway if font load fails (e.g. in tests)
			}
			animate();
		};

		window.addEventListener('splashComplete', handleSplashComplete, { once: true });

		return () => {
			window.removeEventListener('splashComplete', handleSplashComplete);
			// Clean up ScrollTrigger instance
			if (scrollTriggerInstance) {
				scrollTriggerInstance.kill();
			}
			ScrollTrigger.refresh();
		};
	}, []);

	return (
		<div 
			ref={containerRef} 
			className="mb-6 scale-75 md:scale-100 origin-center"
			style={{
				willChange: 'transform, opacity',
				transform: 'translateZ(0)', // Force GPU acceleration
				backfaceVisibility: 'hidden' as const,
				perspective: 1000,
			}}
		>
			<svg
				ref={svgRef}
				className="w-full overflow-visible"
				style={{ height: 'auto' }}
				viewBox="0 0 1200 700"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					<linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#C9C7C1">
							<animate
								attributeName="stop-color"
								values="#C9C7C1; #E8E6E1; #BAB8B2; #AAA8A2; #C9C7C1"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<stop offset="50%" stopColor="#BAB8B2">
							<animate
								attributeName="stop-color"
								values="#BAB8B2; #AAA8A2; #E8E6E1; #C9C7C1; #BAB8B2"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<stop offset="100%" stopColor="#AAA8A2">
							<animate
								attributeName="stop-color"
								values="#AAA8A2; #C9C7C1; #BAB8B2; #E8E6E1; #AAA8A2"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<animateTransform
							attributeName="gradientTransform"
							type="translate"
							values="0 0; 0.3 0; 0 0"
							dur="3s"
							repeatCount="indefinite"
						/>
					</linearGradient>
				</defs>

				<text
					ref={name1PathRef}
					x="50%"
					y="10%"
					textAnchor="middle"
					dominantBaseline="middle"
					style={{
						fontFamily: "'Mon de Tresor', serif",
						fontSize: '420px',
						fontWeight: 400,
						letterSpacing: '0.02em',
						textTransform: 'uppercase',
						fill: 'url(#goldGradient)',
						filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
					}}
				>
					{name1}
				</text>

				<text
					ref={andPathRef}
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					style={{
						fontFamily: "'Auteur Script', cursive",
						fontSize: '160px',
						fontWeight: 400,
						fill: 'url(#goldGradient)',
						filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
					}}
				>
					And
				</text>

				<text
					ref={name2PathRef}
					x="50%"
					y="90%"
					textAnchor="middle"
					dominantBaseline="middle"
					style={{
						fontFamily: "'Mon de Tresor', serif",
						fontSize: '420px',
						fontWeight: 400,
						letterSpacing: '0.02em',
						textTransform: 'uppercase',
						fill: 'url(#goldGradient)',
						filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
					}}
				>
					{name2}
				</text>
			</svg>
		</div>
	);
}
