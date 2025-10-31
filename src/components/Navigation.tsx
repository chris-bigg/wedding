import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';

const navItems = [
	{ href: '#home', label: 'Home' },
	{ href: '#story', label: 'Story' },
	{ href: '#details', label: 'Details' },
	{ href: '#location', label: 'Location' },
	{ href: '#accommodation', label: 'Stay' },
	{ href: '#faq', label: 'FAQ' },
	{ href: '#gift', label: 'Gift' },
];

export default function Navigation() {
	const [activeSection, setActiveSection] = useState('home');
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-20% 0px -60% 0px',
			threshold: 0,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		}, observerOptions);

		// Observe all sections
		const sections = ['home', 'story', 'details', 'location', 'accommodation', 'faq', 'gift', 'rsvp'];
		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			sections.forEach((id) => {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, []);

	const handleMenuItemClick = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			{/* Desktop Navigation */}
			<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 hidden md:block">
				<nav className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs shadow-lg rounded-full border border-stone-200/50 dark:border-stone-700/50">
					<div className="px-4 py-3">
						<div className="flex justify-between items-center">
							<ul className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 text-xs sm:text-sm mx-auto">
								{navItems.map((item) => {
									const isActive = activeSection === item.href.substring(1);
									return (
										<li key={item.href}>
											<a
												href={item.href}
												className={`transition-all duration-300 whitespace-nowrap ${
													isActive
														? 'text-emerald-700 dark:text-emerald-400 font-bold'
														: 'text-stone-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-400'
												}`}
											>
												{item.label}
											</a>
										</li>
									);
								})}
								<li>
									<a
										href="#rsvp"
										className={`bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap ${
											activeSection === 'rsvp' ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
										}`}
									>
										RSVP
									</a>
								</li>
							</ul>
							<div className="ml-3">
								<DarkModeToggle />
							</div>
						</div>
					</div>
				</nav>
			</div>

			{/* Mobile Navigation */}
			<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 md:hidden">
				<nav className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs shadow-lg rounded-full border border-stone-200/50 dark:border-stone-700/50">
					<div className="px-4 py-3 flex justify-between items-center">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-stone-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
							aria-label="Toggle menu"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isMobileMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
						<DarkModeToggle />
					</div>
				</nav>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 z-40 md:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				>
					<div className="absolute inset-0 bg-stone-900/50 dark:bg-stone-950/70 backdrop-blur-sm" />
					<div
						className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/50 dark:border-stone-700/50 overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<ul className="py-6">
							{navItems.map((item) => {
								const isActive = activeSection === item.href.substring(1);
								return (
									<li key={item.href}>
										<a
											href={item.href}
											onClick={handleMenuItemClick}
											className={`block px-8 py-4 text-lg transition-all duration-300 ${
												isActive
													? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/30'
													: 'text-stone-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
											}`}
										>
											{item.label}
										</a>
									</li>
								);
							})}
							<li className="mt-4 px-8">
								<a
									href="#rsvp"
									onClick={handleMenuItemClick}
									className="block text-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
								>
									RSVP
								</a>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
}
