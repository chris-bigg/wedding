import { useEffect, useRef } from 'react';

export default function CustomCursor() {
	const cursorRef = useRef<HTMLDivElement>(null);
	const cursorDotRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cursor = cursorRef.current;
		const cursorDot = cursorDotRef.current;
		if (!cursor || !cursorDot) return;

		// Check if device supports hover (has a cursor)
		const hasHover = window.matchMedia('(hover: hover)').matches;
		if (!hasHover) {
			// Hide cursor on touch devices
			cursor.style.display = 'none';
			cursorDot.style.display = 'none';
			return;
		}

		let mouseX = window.innerWidth / 2;
		let mouseY = window.innerHeight / 2;
		let cursorX = mouseX;
		let cursorY = mouseY;
		let cursorDotX = mouseX;
		let cursorDotY = mouseY;
		let isHovering = false;
		let isPressed = false;

		const updateCursor = () => {
			// Safeguard: if cursor is way off screen, reset to mouse position
			const maxDistance = Math.max(window.innerWidth, window.innerHeight);
			const distance = Math.sqrt((mouseX - cursorX) ** 2 + (mouseY - cursorY) ** 2);
			if (distance > maxDistance) {
				cursorX = mouseX;
				cursorY = mouseY;
				cursorDotX = mouseX;
				cursorDotY = mouseY;
			}

			// Main cursor with delay (outer circle)
			const dx = mouseX - cursorX;
			const dy = mouseY - cursorY;
			cursorX += dx * 0.15; // Slower following speed
			cursorY += dy * 0.15;

			let scale = isPressed ? 0.8 : isHovering ? 1.5 : 1;
			cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${scale})`;

			// Dot cursor with less delay (inner dot)
			const dotDx = mouseX - cursorDotX;
			const dotDy = mouseY - cursorDotY;
			cursorDotX += dotDx * 0.5; // Faster following speed
			cursorDotY += dotDy * 0.5;

			cursorDot.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px) scale(${isPressed ? 0.8 : 1})`;

			requestAnimationFrame(updateCursor);
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			
			// Ensure cursor is visible when mouse moves
			if (cursor && cursorDot) {
				cursor.style.opacity = '1';
				cursorDot.style.opacity = '1';
			}
			
			// Check if hovering over interactive element
			const element = document.elementFromPoint(mouseX, mouseY) as HTMLElement;
			if (element) {
				const isInteractive = element.tagName === 'A' || 
					element.tagName === 'BUTTON' || 
					element.closest('a') !== null || 
					element.closest('button') !== null || 
					(element.hasAttribute('role') && element.getAttribute('role') === 'button');
				
				if (isInteractive !== isHovering) {
					isHovering = isInteractive;
					if (cursor) {
						if (isHovering) {
							cursor.classList.add('cursor-hover');
						} else {
							cursor.classList.remove('cursor-hover');
						}
					}
				}
			}
		};

		// Show cursor when mouse enters the document
		const handleDocumentMouseEnter = () => {
			// Force cursor to none when mouse re-enters
			document.body.style.cursor = 'none';
			if (cursor && cursorDot) {
				// Only show if mouse is actually moving
				// Will be shown by handleMouseMove
			}
		};

		// Hide cursor when mouse leaves the document
		const handleDocumentMouseLeave = () => {
			// Check if mouse is actually outside viewport
			if (mouseY <= 0 || mouseY >= window.innerHeight || 
			    mouseX <= 0 || mouseX >= window.innerWidth) {
				if (cursor && cursorDot) {
					cursor.style.opacity = '0';
					cursorDot.style.opacity = '0';
				}
			}
		};

		const handleMouseDown = () => {
			isPressed = true;
		};

		const handleMouseUp = () => {
			isPressed = false;
		};

		// Force cursor to none initially
		document.body.style.cursor = 'none';
		
		// Keep cursor hidden initially - only show on mouse move
		cursor.style.opacity = '0';
		cursorDot.style.opacity = '0';

		// Continuously enforce cursor: none
		const enforceCursorNone = () => {
			if (document.body) {
				document.body.style.cursor = 'none';
			}
			if (document.documentElement) {
				document.documentElement.style.cursor = 'none';
			}
		};

		document.addEventListener('mousemove', handleMouseMove, { passive: true });
		document.addEventListener('mouseenter', handleDocumentMouseEnter, true);
		document.addEventListener('mouseleave', handleDocumentMouseLeave, true);
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);
		
		// Enforce cursor: none on mouseenter globally
		document.addEventListener('mouseenter', enforceCursorNone, true);
		
		// Periodically enforce cursor: none to catch edge cases
		const cursorEnforcementInterval = setInterval(enforceCursorNone, 100);

		// Initialize cursor position immediately
		updateCursor();

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseenter', handleDocumentMouseEnter, true);
			document.removeEventListener('mouseleave', handleDocumentMouseLeave, true);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseenter', enforceCursorNone, true);
			clearInterval(cursorEnforcementInterval);
			// Restore default cursor on cleanup
			document.body.style.cursor = '';
			document.documentElement.style.cursor = '';
		};
	}, []);

	return (
		<>
			<div ref={cursorRef} className="custom-cursor" />
			<div ref={cursorDotRef} className="custom-cursor-dot" />
		</>
	);
}

