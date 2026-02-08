import { useState, useEffect } from 'react';

interface WindowSize {
	width: number;
	height: number;
}

/**
 * Custom hook to track window dimensions with debouncing for better performance
 * @param debounceMs - Debounce delay in milliseconds (default: 150ms)
 */
export function useWindowSize(debounceMs: number = 150): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		let timeoutId: NodeJS.Timeout | null = null;

		const handleResize = () => {
			// Clear any pending timeout
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// Set new timeout to update dimensions after debounce period
			timeoutId = setTimeout(() => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}, debounceMs);
		};

		// Set initial dimensions
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			window.removeEventListener('resize', handleResize);
		};
	}, [debounceMs]);

	return windowSize;
}
