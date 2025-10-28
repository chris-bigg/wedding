import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FloralAnimation() {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{ threshold: 0.3 } // Trigger when 30% visible
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, []);

	return (
		<div ref={containerRef} className="w-full flex items-center justify-center -mb-10">
			<div className="w-full max-w-4xl aspect-[16/5]">
				{isVisible && (
					<DotLottieReact
						src="/lottie/weddingfloral.lottie"
						autoplay
					/>
				)}
			</div>
		</div>
	);
}
