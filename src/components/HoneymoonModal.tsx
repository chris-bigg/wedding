import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { weddingContent } from '../config/wedding-content';

const SORT_CODE = '04-00-04';
const ACCOUNT_NUMBER = '13592391';

export default function HoneymoonModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [cardFlipped, setCardFlipped] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		// Focus the close button when modal opens
		setTimeout(() => {
			closeButtonRef.current?.focus();
		}, 0);

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			setCardFlipped(false);
			if (triggerButtonRef.current) triggerButtonRef.current.focus();
		}
	}, [isOpen]);

	const modalContent = isOpen ? (
		<div
			ref={modalRef}
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
			onClick={() => setIsOpen(false)}
			role="dialog"
			aria-modal="true"
			aria-labelledby="honeymoon-modal-title"
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-stone-900/70 dark:bg-stone-950/80 backdrop-blur-sm" aria-hidden="true" />

			{/* Modal */}
			<div
				className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/50 dark:border-stone-700/50 max-w-md w-full overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					ref={closeButtonRef}
					onClick={() => setIsOpen(false)}
					className="absolute top-4 right-4 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors z-10"
					aria-label="Close modal"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Content */}
				<div className="p-8 text-center">
					<h3
						id="honeymoon-modal-title"
						className="text-5xl md:text-6xl mb-6 overflow-visible"
						style={{
							fontFamily: "'Mon de Tresor', serif",
							fontWeight: 400,
							lineHeight: 1.3,
						}}
					>
						<span className="inline-block px-4">
							<span className="bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent">Honeym</span>
							<span className="inline-flex items-center relative" style={{ marginLeft: '-0.10em', marginRight: '-0.10em' }}>
								<span className="relative z-10 bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent" style={{ transform: 'translateX(0.08em)' }}>O</span>
								<span className="relative bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent" style={{ marginLeft: '-0.3em', zIndex: 0, transform: 'translateX(-0.08em)' }}>O</span>
							</span>
							<span className="bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent">n Fund</span>
						</span>
					</h3>

					<p className="text-stone-600 dark:text-stone-400 mb-4 text-sm">
						For those who prefer traditional banking, click the QR code below to reveal our sort code and account number.
					</p>

					{/* Flippable card: QR code (front) / bank details (back) */}
					<div className="mb-4 inline-block" style={{ perspective: '1000px' }}>
						<button
							type="button"
							onClick={() => setCardFlipped((f) => !f)}
							className="relative w-[272px] h-[272px] mx-auto block cursor-pointer border-0"
							style={{ transformStyle: 'preserve-3d' }}
							aria-label={cardFlipped ? 'Show QR code' : 'Show bank details'}
						>
							{/* Front: QR code */}
							<div
								className="absolute inset-0 bg-white p-4 rounded-2xl shadow-lg transition-transform duration-500 ease-in-out"
								style={{
									transformStyle: 'preserve-3d',
									backfaceVisibility: 'hidden',
									transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
								}}
							>
								<img
									src="/images/qrcode2.jpg"
									alt="PayPal QR Code"
									className="w-full h-full object-contain"
								/>
								<span className="absolute bottom-2 left-0 right-0 text-xs text-stone-500">Tap for bank details</span>
							</div>
							{/* Back: sort code & account number (selectable so users can copy) */}
							<div
								className="absolute inset-0 bg-stone-100 dark:bg-stone-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-transform duration-500 ease-in-out"
								style={{
									transformStyle: 'preserve-3d',
									backfaceVisibility: 'hidden',
									transform: cardFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
								}}
							>
								<p className="text-stone-600 dark:text-stone-400 text-sm font-medium mb-4">Bank transfer</p>
								<dl
									className="text-left space-y-2 w-full max-w-[200px] select-text cursor-text"
									style={{ userSelect: 'text' }}
									onClick={(e) => e.stopPropagation()}
								>
									<div>
										<dt className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wide">Sort code</dt>
										<dd className="text-lg font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{SORT_CODE}</dd>
									</div>
									<div>
										<dt className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wide">Account number</dt>
										<dd className="text-lg font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{ACCOUNT_NUMBER}</dd>
									</div>
								</dl>
								<span className="absolute bottom-2 left-0 right-0 text-xs text-stone-500">Tap for QR code</span>
							</div>
						</button>
					</div>

					{/* PayPal Button */}
					<a
						href="https://paypal.me/FeleenaAndChris"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 dark:from-stone-200/30 dark:to-stone-300/40 dark:hover:from-stone-300/40 dark:hover:to-stone-200/30 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
					>
						Open PayPal
					</a>
				</div>
			</div>
		</div>
	) : null;

	return (
		<>
			<button
				ref={triggerButtonRef}
				onClick={() => setIsOpen(true)}
				className="inline-block bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 dark:from-stone-200/30 dark:to-stone-300/40 dark:hover:from-stone-300/40 dark:hover:to-stone-200/30 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-fit"
			>
				Contribute to Our Honeymoon
			</button>

			{typeof document !== 'undefined' && createPortal(modalContent, document.body)}
		</>
	);
}
