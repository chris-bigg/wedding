/**
 * Get the dark mode preference from localStorage or system preference
 */
export function getDarkModePreference(): boolean {
	if (typeof window === 'undefined') return false;
	
	const saved = localStorage.getItem('darkMode');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	
	return saved ? saved === 'true' : prefersDark;
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
 * Initialize dark mode on page load
 * This should be called as early as possible to prevent flash
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
