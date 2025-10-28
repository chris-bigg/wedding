import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		// Try to autoplay when component mounts
		const playAudio = async () => {
			if (audioRef.current) {
				try {
					await audioRef.current.play();
					setIsPlaying(true);
				} catch (error) {
					// Autoplay blocked - user will need to click play
					console.log('Autoplay prevented:', error);
				}
			}
		};

		// Small delay to ensure splash screen starts first
		const timer = setTimeout(playAudio, 500);
		return () => clearTimeout(timer);
	}, []);

	const togglePlay = async () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				try {
					await audioRef.current.play();
					setIsPlaying(true);
				} catch (error) {
					console.error('Error playing audio:', error);
				}
			}
		}
	};

		return (
		<>
			<audio ref={audioRef} loop>
				<source src={`${import.meta.env.BASE_URL}/audio/wedding-music.mp3`} type="audio/mpeg" />
			</audio>
			
			<button
				onClick={togglePlay}
				className="fixed bottom-6 left-6 z-50 bg-stone-800/80 hover:bg-stone-700/90 backdrop-blur-sm text-stone-200 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-stone-600/50 flex items-center gap-2"
				title={isPlaying ? 'Pause music' : 'Play music'}
			>
				{isPlaying ? (
					<>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M5 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm8 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" />
						</svg>
						<span>Pause</span>
					</>
				) : (
					<>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
						</svg>
						<span>Play</span>
					</>
				)}
			</button>
		</>
	);
}
