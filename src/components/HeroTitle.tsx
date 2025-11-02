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
	const name2PathRef = useRef<SVGTextElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDrawn, setIsDrawn] = useState(false);

	useEffect(() => {
		if (!svgRef.current || !name1PathRef.current || !name2PathRef.current) return;

		// Set initial hidden state
		gsap.set([name1PathRef.current, name2PathRef.current], {
			opacity: 0,
			scale: 0.8,
			y: 50,
		});

		let scrollTriggerInstance: ScrollTrigger | null = null;

		const animate = () => {
			if (!svgRef.current || !name1PathRef.current || !name2PathRef.current || !containerRef.current) return;

			const tl = gsap.timeline();

			// Elegant fade and scale in for first name
			tl.to(name1PathRef.current, {
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 1.5,
				ease: 'power3.out',
			});

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

		// Wait for splash screen to complete
		const handleSplashComplete = () => {
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
			className="mb-6"
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
						<stop offset="0%" stopColor="#D4C5A9">
							<animate
								attributeName="stop-color"
								values="#D4C5A9; #F5EDE0; #C4B69A; #B8AA8E; #D4C5A9"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<stop offset="50%" stopColor="#C4B69A">
							<animate
								attributeName="stop-color"
								values="#C4B69A; #B8AA8E; #F5EDE0; #D4C5A9; #C4B69A"
								dur="4s"
								repeatCount="indefinite"
							/>
						</stop>
						<stop offset="100%" stopColor="#B8AA8E">
							<animate
								attributeName="stop-color"
								values="#B8AA8E; #D4C5A9; #C4B69A; #F5EDE0; #B8AA8E"
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
					y="30%"
					textAnchor="middle"
					dominantBaseline="middle"
					style={{
						fontFamily: "'Great Vibes', cursive",
						fontSize: '500px',
						fontWeight: 400,
						fill: 'url(#goldGradient)',
						filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 1)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
					}}
				>
					{name1}
				</text>

				<text
					ref={name2PathRef}
					x="50%"
					y="75%"
					textAnchor="middle"
					dominantBaseline="middle"
					style={{
						fontFamily: "'Great Vibes', cursive",
						fontSize: '500px',
						fontWeight: 400,
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
