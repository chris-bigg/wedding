import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionAnimations() {
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		// Small delay to ensure DOM is ready
		timeoutId = setTimeout(() => {
			// Animate section titles (h2 with data-animate-title)
			gsap.utils.toArray<HTMLElement>('[data-animate-title]').forEach((element) => {
			gsap.fromTo(
				element,
				{
					opacity: 0,
					y: 50,
					scale: 0.9,
				},
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

		// Animate text content (data-animate-text)
		gsap.utils.toArray<HTMLElement>('[data-animate-text]').forEach((element) => {
			gsap.fromTo(
				element,
				{
					opacity: 0,
					y: 30,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 85%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

		// Animate images with scale and fade (data-animate-image)
		gsap.utils.toArray<HTMLElement>('[data-animate-image]').forEach((element) => {
			gsap.fromTo(
				element,
				{
					opacity: 0,
					scale: 1.1,
				},
				{
					opacity: 1,
					scale: 1,
					duration: 1.2,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

		// Animate items from left (data-animate-left)
		gsap.utils.toArray<HTMLElement>('[data-animate-left]').forEach((element) => {
			gsap.fromTo(
				element,
				{
					opacity: 0,
					x: -60,
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.9,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

		// Animate items from right (data-animate-right)
		gsap.utils.toArray<HTMLElement>('[data-animate-right]').forEach((element) => {
			gsap.fromTo(
				element,
				{
					opacity: 0,
					x: 60,
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.9,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

		// Stagger animation for list items (data-animate-stagger)
		gsap.utils.toArray<HTMLElement>('[data-animate-stagger]').forEach((container) => {
			const items = container.querySelectorAll('[data-stagger-item]');
			gsap.fromTo(
				items,
				{
					opacity: 0,
					y: 30,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power2.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: container,
						start: 'top 85%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

		// Fade up animation for cards/sections (data-animate-fade-up)
		gsap.utils.toArray<HTMLElement>('[data-animate-fade-up]').forEach((element) => {
			gsap.fromTo(
				element,
				{
					opacity: 0,
					y: 40,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 85%',
						toggleActions: 'play none none none',
					},
				}
			);
		});

			// Refresh ScrollTrigger after setting up animations
			ScrollTrigger.refresh();
		}, 100);

		// Cleanup
		return () => {
			clearTimeout(timeoutId);
			ScrollTrigger.getAll().forEach((trigger) => {
				if (trigger.vars && trigger.vars.trigger) {
					trigger.kill();
				}
			});
		};
	}, []);

	return null;
}

