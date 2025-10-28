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
				className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-600 transition-all duration-150 ease-out shadow-lg shadow-emerald-500/50"
				style={{ width: `${scrollProgress}%` }}
			/>
		</div>
	);
}
