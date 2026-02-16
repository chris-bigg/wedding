import { useState, useEffect } from 'react';
import { getDarkModePreference, getThemeMode, setDarkMode, setThemeMode, type ThemeMode } from '../utils/darkMode';

const baseBtn =
	'p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-white/50';
const activeBtn = 'bg-stone-300 dark:bg-stone-600 text-green-800 dark:text-white';
const inactiveBtn = 'bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-600 dark:text-stone-400';

export default function DarkModeToggle() {
	const [mode, setModeState] = useState<ThemeMode>('system');
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const currentMode = getThemeMode();
		setModeState(currentMode);
		const shouldBeDark = getDarkModePreference();
		setIsDark(shouldBeDark);
		// Re-apply theme on mount so document matches system when no saved pref (fixes load-in-light when system is dark)
		setDarkMode(shouldBeDark);

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			const hasUserPreference = localStorage.getItem('darkMode');
			if (!hasUserPreference) {
				setModeState('system');
				setIsDark(e.matches);
			}
		};

		try {
			media.addEventListener('change', handleChange);
			return () => media.removeEventListener('change', handleChange);
		} catch {
			media.addListener(handleChange as any);
			return () => media.removeListener(handleChange as any);
		}
	}, []);

	const handleSelect = (next: ThemeMode) => {
		const appliedDark = setThemeMode(next);
		setModeState(next);
		setIsDark(appliedDark);
	};

	return (
		<div
			className="inline-flex rounded-full bg-stone-200 dark:bg-stone-700 p-1 gap-0.5"
			role="group"
			aria-label="Theme"
		>
			<button
				type="button"
				onClick={() => handleSelect('light')}
				className={`${baseBtn} ${mode === 'light' ? activeBtn : inactiveBtn}`}
				title="Light mode"
				aria-label="Light mode"
				aria-pressed={mode === 'light'}
			>
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
					<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
				</svg>
			</button>
			<button
				type="button"
				onClick={() => handleSelect('dark')}
				className={`${baseBtn} ${mode === 'dark' ? activeBtn : inactiveBtn}`}
				title="Dark mode"
				aria-label="Dark mode"
				aria-pressed={mode === 'dark'}
			>
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				</svg>
			</button>
			<button
				type="button"
				onClick={() => handleSelect('system')}
				className={`${baseBtn} ${mode === 'system' ? activeBtn : inactiveBtn}`}
				title="Follow system preference"
				aria-label="Follow system preference"
				aria-pressed={mode === 'system'}
			>
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
					<path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
				</svg>
			</button>
		</div>
	);
}
