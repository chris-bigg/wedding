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
	);
}
