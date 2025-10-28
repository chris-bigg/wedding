import { useState } from 'react';
import { weddingContent } from '../config/wedding-content';

interface FormData {
	name: string;
	email: string;
	attendance: 'yes' | 'no' | '';
	plusOne: boolean;
	plusOneName: string;
	dietaryRestrictions: string;
	songRequest: string;
}

export default function RSVPForm() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		attendance: '',
		plusOne: false,
		plusOneName: '',
		dietaryRestrictions: '',
		songRequest: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage('');

		// TODO: Integrate with your chosen backend (Formspree, Netlify Forms, API Route, etc.)
		// Example with Formspree:
		const response = await fetch('https://formspree.io/f/xgvpanpe', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(formData),
		});

		// Simulated submission for now
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitMessage('Thank you for your RSVP! We can\'t wait to celebrate with you!');
			// Reset form
			setFormData({
				name: '',
				email: '',
				attendance: '',
				plusOne: false,
				plusOneName: '',
				dietaryRestrictions: '',
				songRequest: '',
			});
		}, 1500);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	return (
		<section id="rsvp" className="py-20 px-4 bg-gradient-to-br from-[#F3F7F1]/50 via-[#E8F2E6]/40 to-emerald-50/40 dark:from-stone-900/30 dark:via-stone-900/20 dark:to-stone-950/30">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-5xl md:text-6xl text-center mb-4 overflow-visible" style={{fontFamily: "'Great Vibes', cursive", fontWeight: 400, lineHeight: 1.3, padding: '0.5rem 0'}}>
					<span className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 bg-clip-text text-transparent px-4">
						RSVP
					</span>
				</h2>
				<p className="text-center text-stone-600 dark:text-stone-400 mb-12">
					Please respond by {weddingContent.rsvp.deadline}
				</p>

				<form onSubmit={handleSubmit} className="space-y-6 bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 dark:border-stone-700/50 shadow-lg">
					{/* Name */}
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
							Your Name *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
						/>
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
							Email Address *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
						/>
					</div>

					{/* Attendance */}
					<div>
						<label htmlFor="attendance" className="block text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
							Will you be attending? *
						</label>
						<select
							id="attendance"
							name="attendance"
							required
							value={formData.attendance}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
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
									className="w-4 h-4 text-emerald-600 border-stone-300 dark:border-stone-600 rounded focus:ring-emerald-500"
								/>
								<label htmlFor="plusOne" className="ml-2 text-sm text-stone-700 dark:text-stone-300">
									I will be bringing a plus-one
								</label>
							</div>

							{formData.plusOne && (
								<div>
									<label htmlFor="plusOneName" className="block text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
										Plus-One Name
									</label>
									<input
										type="text"
										id="plusOneName"
										name="plusOneName"
										value={formData.plusOneName}
										onChange={handleChange}
										className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
									/>
								</div>
							)}

							{/* Dietary Restrictions */}
							<div>
								<label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
									Dietary Restrictions
								</label>
								<textarea
									id="dietaryRestrictions"
									name="dietaryRestrictions"
									rows={3}
									value={formData.dietaryRestrictions}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
									placeholder="Let us know of any dietary needs..."
								/>
							</div>

							{/* Song Request */}
							<div>
								<label htmlFor="songRequest" className="block text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">
									Song Request
								</label>
								<input
									type="text"
									id="songRequest"
									name="songRequest"
									value={formData.songRequest}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-stone-900 dark:text-stone-100"
									placeholder="What song will get you on the dance floor?"
								/>
							</div>
						</>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full button-sparkle bg-gradient-to-r from-[#D4C5A9] via-[#C4B69A] to-[#B8AA8E] hover:from-[#C4B69A] hover:via-[#B8AA8E] hover:to-[#AA9C80] disabled:bg-stone-400 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 text-3xl"
						style={{fontFamily: "'Great Vibes', cursive", fontWeight: 400}}
					>
						{isSubmitting ? 'Submitting...' : 'Submit RSVP'}
					</button>

					{submitMessage && (
						<p className="text-center text-emerald-700 dark:text-emerald-400 font-medium">{submitMessage}</p>
					)}
				</form>
			</div>
		</section>
	);
}
