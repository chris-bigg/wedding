import { useState, useEffect } from 'react';

export default function ScrollProgress() {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		let rafId: number;
		
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = (scrollTop / docHeight) * 100;
			setScrollProgress(scrollPercent);
			
			// Continuously update
			rafId = requestAnimationFrame(updateScrollProgress);
		};

		// Start the animation loop
		rafId = requestAnimationFrame(updateScrollProgress);

		return () => {
			cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div className="fixed top-[3.75rem] left-0 right-0 z-50 h-1 bg-stone-200/30 dark:bg-stone-800/30">
			<div
				className="h-full bg-gradient-to-r from-green-700 via-green-800 to-green-900 dark:from-stone-200/30 dark:via-stone-300/40 dark:to-stone-200/30 transition-all duration-150 ease-out shadow-lg shadow-green-700/50 dark:shadow-stone-200/20"
				style={{ width: `${scrollProgress}%` }}
			/>
		</div>
	);
}
