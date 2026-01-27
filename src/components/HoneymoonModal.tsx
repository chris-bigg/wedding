import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { weddingContent } from '../config/wedding-content';

export default function HoneymoonModal() {
	const [isOpen, setIsOpen] = useState(false);
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
		if (!isOpen && triggerButtonRef.current) {
			triggerButtonRef.current.focus();
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
						className="text-4xl md:text-5xl mb-6 overflow-visible"
						style={{
							fontFamily: "'Mon de Tresor', serif",
							fontWeight: 400,
							lineHeight: 1.3,
						}}
					>
						<span className="inline-block bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent px-4">
							Honeymoon Fund
						</span>
					</h3>

					<p className="text-stone-600 dark:text-stone-400 mb-6 text-sm">
						Scan the QR code or click the button below to contribute
					</p>

					{/* QR Code */}
					<div className="bg-white p-4 rounded-2xl shadow-lg mb-6 inline-block">
					<img
						src="/images/qrcode.png"
						alt="PayPal QR Code"
						className="w-64 h-64 mx-auto"
					/>
					</div>

					{/* PayPal Button */}
					<a
						href="https://paypal.me/mahoganyjoint"
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
