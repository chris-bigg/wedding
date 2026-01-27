import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SplashScreen() {
	const [isVisible, setIsVisible] = useState(true);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [showFallingImage, setShowFallingImage] = useState(false);
	const [hideLottie, setHideLottie] = useState(false);

	useEffect(() => {
		// After 3 seconds, start showing falling image and hide lottie
		const showImageTimer = setTimeout(() => {
			setShowFallingImage(true);
			setHideLottie(true);
		}, 3000);

		// Start fade out after both animations complete
		// Lottie: 3s + Falling animation: 1.8s = 4.8s + 0.5s buffer = 5.3s
		const fadeTimer = setTimeout(() => {
			setIsFadingOut(true);
		}, 5300);

		// Remove from DOM after fade completes
		const removeTimer = setTimeout(() => {
			setIsVisible(false);
			// Dispatch event to signal splash screen is done
			window.dispatchEvent(new CustomEvent('splashComplete'));
			// Mark splash as completed for components that mount later
			sessionStorage.setItem('splashCompleted', 'true');
		}, 6300); // Remove at 6.3 seconds (after 1s fade)

		return () => {
			clearTimeout(showImageTimer);
			clearTimeout(fadeTimer);
			clearTimeout(removeTimer);
		};
	}, []);

	if (!isVisible) return null;

		return (
		<>
			<style>{`
				@keyframes gradient-shimmer {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
				.gradient-shimmer {
					background: linear-gradient(
						-45deg,
						#F8F6F2,
						#E8E6E1,
						#D9D7D2,
						#C9C7C1,
						#BAB8B2,
						#AAA8A2,
						#BAB8B2,
						#C9C7C1,
						#D9D7D2,
						#E8E6E1,
						#F8F6F2
					);
					background-size: 400% 400%;
					animation: gradient-shimmer 6s ease infinite;
				}
				/* Dark mode: monochrome gray tones over near-black */
				.dark .gradient-shimmer {
					background: linear-gradient(
						-45deg,
						#0f0f0f,
						#1a1a18,
						#252522,
						#30302d,
						#3b3b37,
						#464642,
						#3b3b37,
						#30302d,
						#252522,
						#1a1a18,
						#0f0f0f
					);
					background-size: 400% 400%;
					animation: gradient-shimmer 6s ease infinite;
				}
				
				@keyframes fall-and-rotate {
					0% {
						transform: translateY(-100vh) rotate(0deg);
						opacity: 0;
					}
					10% {
						opacity: 1;
					}
					70% {
						transform: translateY(0) rotate(180deg);
					}
					75% {
						transform: translateY(-20px) rotate(185deg);
					}
					80% {
						transform: translateY(0) rotate(180deg);
					}
					85% {
						transform: translateY(-10px) rotate(182deg);
					}
					100% {
						transform: translateY(0) rotate(180deg);
					}
				}
				
				.image-flip {
					transform: scaleY(-1);
				}
				
				.falling-image {
					animation: fall-and-rotate 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				}
				
				.texture-overlay {
					background-image: 
						url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E");
					background-size: 100px 100px;
					mix-blend-mode: multiply;
					opacity: 0.25;
				}
				/* Dark mode: softer blending so gold tones stay visible */
				.dark .texture-overlay {
					mix-blend-mode: soft-light;
					opacity: 0.15;
				}
			`}</style>
			<div 
				className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 gradient-shimmer ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
			>
				{/* Texture Overlay */}
				<div className="absolute inset-0 texture-overlay pointer-events-none"></div>
				{/* Lottie Animation */}
				<div className={`w-64 h-64 md:w-96 md:h-96 relative z-10 transition-opacity duration-500 ${hideLottie ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
				<DotLottieReact
					src="/lottie/Wedding Rings BW.lottie"
					loop
					autoplay
				/>
				</div>
				
				{/* Falling Image */}
				{showFallingImage && (
					<div className="w-80 h-80 md:w-[32rem] md:h-[32rem] absolute z-10 falling-image">
					<img
						src="/images/splash-bw.jpg"
						alt="Wedding splash"
						className="w-full h-full object-contain drop-shadow-2xl image-flip"
					/>
					</div>
				)}
			</div>
		</>
	);
}
