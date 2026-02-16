/**
 * Get the dark mode preference from localStorage or system preference.
 * No saved preference (initial load) = follow system.
 */
export function getDarkModePreference(): boolean {
	if (typeof window === 'undefined') return false;
	
	const saved = localStorage.getItem('darkMode');
	if (saved === 'true') return true;
	if (saved === 'false') return false;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark;
}

/**
 * Set dark mode on the document element
 */
export function setDarkMode(isDark: boolean): void {
	if (typeof window === 'undefined') return;
	
	if (isDark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}

/**
 * Initialize dark mode on page load. Does not write to localStorage;
 * no saved preference means follow system (initial load default).
 * Call as early as possible to prevent flash.
 */
export function initDarkMode(): void {
	if (typeof window === 'undefined') return;
	const shouldBeDark = getDarkModePreference();
	setDarkMode(shouldBeDark);
}

/**
 * Toggle dark mode and save preference
 */
export function toggleDarkMode(): boolean {
	if (typeof window === 'undefined') return false;
	
	const currentIsDark = document.documentElement.classList.contains('dark');
	const newValue = !currentIsDark;
	
	localStorage.setItem('darkMode', String(newValue));
	setDarkMode(newValue);
	
	return newValue;
}

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Get the current theme mode. No saved preference (initial load) = 'system'.
 */
export function getThemeMode(): ThemeMode {
	if (typeof window === 'undefined') return 'system';
	const saved = localStorage.getItem('darkMode');
	if (saved === 'true') return 'dark';
	if (saved === 'false') return 'light';
	return 'system';
}

/**
 * Set theme mode and apply it
 */
export function setThemeMode(mode: ThemeMode): boolean {
	if (typeof window === 'undefined') return false;
	if (mode === 'system') {
		return followSystemPreference();
	}
	const isDark = mode === 'dark';
	localStorage.setItem('darkMode', String(isDark));
	setDarkMode(isDark);
	return isDark;
}

/**
 * Clear saved preference and follow system preference
 */
export function followSystemPreference(): boolean {
	if (typeof window === 'undefined') return false;
	
	localStorage.removeItem('darkMode');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	setDarkMode(prefersDark);
	
	return prefersDark;
}
