import { useState } from 'react';

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
		// const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify(formData),
		// });

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
		<section id="rsvp" className="py-20 px-4 bg-white">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-4xl md:text-5xl font-serif font-light text-center text-neutral-800 mb-4">
					RSVP
				</h2>
				<p className="text-center text-neutral-600 mb-12">
					Please respond by {/* Add RSVP deadline from config */}
				</p>

				<form onSubmit={handleSubmit} className="space-y-6 bg-neutral-50 rounded-lg p-8">
					{/* Name */}
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
							Your Name *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
						/>
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
							Email Address *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
						/>
					</div>

					{/* Attendance */}
					<div>
						<label htmlFor="attendance" className="block text-sm font-medium text-neutral-700 mb-2">
							Will you be attending? *
						</label>
						<select
							id="attendance"
							name="attendance"
							required
							value={formData.attendance}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
									className="w-4 h-4 text-rose-600 border-neutral-300 rounded focus:ring-rose-500"
								/>
								<label htmlFor="plusOne" className="ml-2 text-sm text-neutral-700">
									I will be bringing a plus-one
								</label>
							</div>

							{formData.plusOne && (
								<div>
									<label htmlFor="plusOneName" className="block text-sm font-medium text-neutral-700 mb-2">
										Plus-One Name
									</label>
									<input
										type="text"
										id="plusOneName"
										name="plusOneName"
										value={formData.plusOneName}
										onChange={handleChange}
										className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
									/>
								</div>
							)}

							{/* Dietary Restrictions */}
							<div>
								<label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-neutral-700 mb-2">
									Dietary Restrictions
								</label>
								<textarea
									id="dietaryRestrictions"
									name="dietaryRestrictions"
									rows={3}
									value={formData.dietaryRestrictions}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
									placeholder="Let us know of any dietary needs..."
								/>
							</div>

							{/* Song Request */}
							<div>
								<label htmlFor="songRequest" className="block text-sm font-medium text-neutral-700 mb-2">
									Song Request
								</label>
								<input
									type="text"
									id="songRequest"
									name="songRequest"
									value={formData.songRequest}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
									placeholder="What song will get you on the dance floor?"
								/>
							</div>
						</>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-neutral-400 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
					>
						{isSubmitting ? 'Submitting...' : 'Submit RSVP'}
					</button>

					{submitMessage && (
						<p className="text-center text-green-600 font-medium">{submitMessage}</p>
					)}
				</form>
			</div>
		</section>
	);
}
