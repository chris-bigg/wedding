import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function HoneymoonModal() {
	const [isOpen, setIsOpen] = useState(false);

	const modalContent = isOpen ? (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
			onClick={() => setIsOpen(false)}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-stone-900/70 dark:bg-stone-950/80 backdrop-blur-sm" />

			{/* Modal */}
			<div
				className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/50 dark:border-stone-700/50 max-w-md w-full overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={() => setIsOpen(false)}
					className="absolute top-4 right-4 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors z-10"
					aria-label="Close"
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
						className="text-4xl md:text-5xl mb-6 overflow-visible"
						style={{
							fontFamily: "'Great Vibes', cursive",
							fontWeight: 400,
							lineHeight: 1.3,
						}}
					>
						<span className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 bg-clip-text text-transparent px-4">
							Honeymoon Fund
						</span>
					</h3>

					<p className="text-stone-700 dark:text-stone-300 mb-6">
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
						className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
				onClick={() => setIsOpen(true)}
				className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-fit"
			>
				Contribute to Our Honeymoon
			</button>

			{typeof document !== 'undefined' && createPortal(modalContent, document.body)}
		</>
	);
}
