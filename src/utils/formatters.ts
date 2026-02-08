/**
 * Format an array of names into a readable string
 * Examples:
 * - ["John"] => "John"
 * - ["John", "Jane"] => "John & Jane"
 * - ["John", "Jane", "Bob"] => "John, Jane & Bob"
 */
export function formatNames(names: string[]): string {
	if (names.length === 0) return '';
	if (names.length === 1) return names[0];
	if (names.length === 2) return `${names[0]} & ${names[1]}`;
	const allButLast = names.slice(0, -1).join(', ');
	return `${allButLast} & ${names[names.length - 1]}`;
}
