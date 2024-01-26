import React, { useRef } from 'react';

let prevMouseX = 0;
let prevMouseY = 0;
export default function MouseDodgingSpan({
	text,
	className = '',
}: {
	text: string;
	className?: string;
}) {
	const spanRef = useRef<HTMLSpanElement>(null);

	const handleSpanMouseEvent = (e: React.MouseEvent<HTMLSpanElement>) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
		if (spanRef.current) {
			const span = spanRef.current;
			const spanCenterX = span.offsetLeft + span.offsetWidth / 2;
			const spanCenterY = span.offsetTop + span.offsetHeight / 2;

			const deltaX = spanCenterX - mouseX;
			const deltaY = spanCenterY - mouseY;
			const angle = ((deltaX % 100) / 100) * 30;
			span.style.transform = `translate(${deltaX > 0 ? -10 : 10}%, ${
				deltaY > 0 ? -30 : 30
			}%) rotate(${angle}deg)`;
		}
	};

	return (
  <span
    ref={spanRef}
    onMouseMove={handleSpanMouseEvent}
    onMouseEnter={handleSpanMouseEvent}
    className={`transition-all block w-max text-[60px] duration-[1000ms] ${className} hover:text-grn`}
		>
    {text}
  </span>
	);
}
