import { useState, useEffect } from 'react';

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateTimeLeft = () => {
			const weddingDate = new Date('2026-08-01T13:00:00').getTime();
			const now = new Date().getTime();
			const difference = weddingDate - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				});
			}
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, []);

	const timeUnits = [
		{ value: timeLeft.days, label: 'Days' },
		{ value: timeLeft.hours, label: 'Hours' },
		{ value: timeLeft.minutes, label: 'Minutes' },
		{ value: timeLeft.seconds, label: 'Seconds' },
	];

	return (
		<div className="mt-6 mb-2">
			<div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6">
				{timeUnits.map((unit) => (
					<div key={unit.label} className="flex flex-col items-center gap-1" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
						<span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-normal text-stone-700 dark:text-stone-200 tabular-nums inline-block min-w-[3ch] text-center">
							{unit.label === 'Days' ? String(unit.value).padStart(3, '0') : String(unit.value).padStart(2, '0')}
						</span>
						<span className="text-xs sm:text-xs text-stone-700 dark:text-stone-300 font-sans font-light uppercase tracking-widest whitespace-nowrap" style={{ letterSpacing: '0.15em' }}>
							{unit.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
