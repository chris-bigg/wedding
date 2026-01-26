import { useState, useEffect } from 'react';
import { weddingContent } from '../config/wedding-content';
import Confetti from 'react-confetti';
import { GUEST_LIST } from '../data/guests';

interface FormData {
	names: string[];
	email: string;
	attendance: 'yes' | 'no' | '';
	plusOne: boolean;
	plusOneName: string;
	dietaryRestrictions: string;
	songRequest: string;
}

export default function RSVPForm() {
	const [formData, setFormData] = useState<FormData>({
		names: [''],
		email: '',
		attendance: '',
		plusOne: false,
		plusOneName: '',
		dietaryRestrictions: '',
		songRequest: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [confettiFading, setConfettiFading] = useState(false);
	const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Set initial dimensions
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Read URL ID parameter and pre-fill form
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const id = params.get('id');
			
			if (id && GUEST_LIST[id]) {
				const guestData = GUEST_LIST[id];
				setFormData(prev => ({
					...prev,
					names: [...guestData.names],
					email: guestData.email || prev.email,
				}));
				
				// Clean up URL by removing the id parameter
				params.delete('id');
				const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
				window.history.replaceState({}, '', newUrl);
			}
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted with data:', formData);
		setIsSubmitting(true);
		setSubmitMessage('');

		const attendingYes = formData.attendance === 'yes';
		console.log('Attending yes?', attendingYes);

		// Combine names for submission (Formspree expects a single name field)
		const submissionData = {
			...formData,
			name: formData.names.filter(n => n.trim()).join(' '),
		};
		delete (submissionData as any).names;

		try {
			const response = await fetch('https://formspree.io/f/xgvpanpe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(submissionData),
			});

			if (response.ok) {
				console.log('Form submission successful!');
				setIsSubmitting(false);
				setSubmitMessage('Thank you for your RSVP! We can\'t wait to celebrate with you!');
				
				// Trigger confetti only if attending
				if (attendingYes) {
					console.log('Triggering confetti!');
					setShowConfetti(true);
					setConfettiFading(false);
					console.log('showConfetti state set to true');
					// Start fading after 5 seconds
					setTimeout(() => {
						console.log('Fading confetti');
						setConfettiFading(true);
					}, 5000);
					// Remove completely after fade (5s + 2s fade)
					setTimeout(() => {
						console.log('Stopping confetti');
						setShowConfetti(false);
						setConfettiFading(false);
					}, 7000);
				}

				// Reset form
				setFormData({
					names: [''],
					email: '',
					attendance: '',
					plusOne: false,
					plusOneName: '',
					dietaryRestrictions: '',
					songRequest: '',
				});
			} else {
				console.error('Form submission failed:', response.status);
				setIsSubmitting(false);
				setSubmitMessage('Something went wrong. Please try again.');
			}
		} catch (error) {
			console.error('Form submission error:', error);
			setIsSubmitting(false);
			setSubmitMessage('Something went wrong. Please try again.');
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		// Handle name array fields (name-0, name-1, etc.)
		if (name.startsWith('name-')) {
			const index = parseInt(name.split('-')[1], 10);
			setFormData((prev) => ({
				...prev,
				names: prev.names.map((n, i) => (i === index ? value : n)),
			}));
			return;
		}

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const addNameField = () => {
		setFormData((prev) => ({
			...prev,
			names: [...prev.names, ''],
		}));
	};

	const removeNameField = (index: number) => {
		if (formData.names.length > 1) {
			setFormData((prev) => ({
				...prev,
				names: prev.names.filter((_, i) => i !== index),
			}));
		}
	};

	console.log('RSVPForm render - showConfetti:', showConfetti, 'windowDimensions:', windowDimensions);

	return (
		<>
			{showConfetti && (
				<div 
					style={{ 
						position: 'fixed', 
						top: 0, 
						left: 0, 
						width: '100%', 
						height: '100%', 
						pointerEvents: 'none', 
						zIndex: 9999,
						opacity: confettiFading ? 0 : 1,
						transition: 'opacity 2s ease-out'
					}}
				>
					<Confetti
						width={windowDimensions.width}
						height={windowDimensions.height}
						recycle={false}
						numberOfPieces={500}
						colors={['#2d5016', '#1a3d0e', '#0f2810', '#C9C7C1', '#BAB8B2', '#AAA8A2']}
					/>
				</div>
			)}
			<section id="rsvp" className="py-20 px-4 bg-gradient-to-br from-[#F2F4F0]/50 via-[#E6E8E2]/40 to-green-50/40 dark:from-stone-900/30 dark:via-stone-900/20 dark:to-stone-950/30">
				<div className="max-w-2xl mx-auto">
				<h2 className="text-5xl md:text-6xl text-center mb-4 overflow-visible" style={{fontFamily: "'Great Vibes', cursive", fontWeight: 400, lineHeight: 1.3, padding: '0.5rem 0'}}>
					<span className="inline-block bg-gradient-to-r from-green-800 to-green-950 dark:from-white dark:to-stone-200 bg-clip-text text-transparent px-4">
						RSVP
					</span>
				</h2>
				<p className="text-center text-stone-600 dark:text-stone-400 mb-12">
					Please respond by {weddingContent.rsvp.deadline}
				</p>

				<form onSubmit={handleSubmit} className="space-y-6 bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 dark:border-stone-700/50 shadow-lg">
					{/* Names - Dynamic fields */}
					<div>
						<label className="block text-sm font-medium text-green-950 dark:text-white mb-2">
							{formData.names.length === 1 ? 'Your Name *' : 'Names *'}
						</label>
						{formData.names.map((name, index) => (
							<div key={index} className="mb-3 flex gap-2">
								<input
									type="text"
									id={`name-${index}`}
									name={`name-${index}`}
									required
									value={name}
									onChange={handleChange}
									placeholder={formData.names.length === 1 ? 'Your Name' : `Name ${index + 1}`}
									className="flex-1 px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-green-700 dark:focus:ring-white/40 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
								/>
								{formData.names.length > 1 && (
									<button
										type="button"
										onClick={() => removeNameField(index)}
										className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
										aria-label="Remove name field"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={addNameField}
							className="text-sm text-green-800 hover:text-green-900 dark:text-white dark:hover:text-stone-200 font-medium"
						>
							+ Add another name
						</button>
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-green-950 dark:text-white mb-2">
							Email Address *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-green-700 dark:focus:ring-white/40 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
						/>
					</div>

					{/* Attendance */}
					<div>
						<label htmlFor="attendance" className="block text-sm font-medium text-green-950 dark:text-white mb-2">
							Will you be attending? *
						</label>
						<select
							id="attendance"
							name="attendance"
							required
							value={formData.attendance}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-green-700 dark:focus:ring-white/40 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
						>
							<option value="">Please select</option>
							<option value="yes">Joyfully accepts</option>
							<option value="no">Regretfully declines</option>
						</select>
					</div>

					{/* Plus One */}
					{formData.attendance === 'yes' && (
						<>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="plusOne"
									name="plusOne"
									checked={formData.plusOne}
									onChange={handleChange}
									className="w-4 h-4 text-green-800 border-stone-300 dark:border-stone-600 rounded focus:ring-green-700 dark:focus:ring-white/40"
								/>
								<label htmlFor="plusOne" className="ml-2 text-sm text-stone-700 dark:text-stone-300">
									I will be bringing a plus-one
								</label>
							</div>

							{formData.plusOne && (
								<div>
									<label htmlFor="plusOneName" className="block text-sm font-medium text-green-950 dark:text-white mb-2">
										Plus-One Name
									</label>
									<input
										type="text"
										id="plusOneName"
										name="plusOneName"
										value={formData.plusOneName}
										onChange={handleChange}
										className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-green-700 dark:focus:ring-white/40 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
									/>
								</div>
							)}

							{/* Dietary Restrictions */}
							<div>
								<label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-green-950 dark:text-white mb-2">
									Dietary Restrictions
								</label>
								<textarea
									id="dietaryRestrictions"
									name="dietaryRestrictions"
									rows={3}
									value={formData.dietaryRestrictions}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-green-700 dark:focus:ring-white/40 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
									placeholder="Let us know of any dietary needs..."
								/>
							</div>

							{/* Song Request */}
							<div>
								<label htmlFor="songRequest" className="block text-sm font-medium text-green-950 dark:text-white mb-2">
									Song Request
								</label>
								<input
									type="text"
									id="songRequest"
									name="songRequest"
									value={formData.songRequest}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-green-700 dark:focus:ring-white/40 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
									placeholder="What song will get you on the dance floor?"
								/>
							</div>
						</>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full button-sparkle bg-gradient-to-r from-[#C9C7C1] via-[#BAB8B2] to-[#AAA8A2] hover:from-[#BAB8B2] hover:via-[#AAA8A2] hover:to-[#9A988F] disabled:bg-stone-400 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 text-3xl"
						style={{fontFamily: "'Great Vibes', cursive", fontWeight: 400}}
					>
						{isSubmitting ? 'Submitting...' : 'Submit RSVP'}
					</button>

					{submitMessage && (
						<p className="text-center text-green-900 dark:text-white font-medium">{submitMessage}</p>
					)}
				</form>
				</div>
			</section>
		</>
	);
}
