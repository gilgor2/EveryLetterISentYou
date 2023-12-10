import React, { useEffect, useRef } from 'react';
import InputStyle from './Input.style';

type Props = {
	state: string | null;
	setstate: React.Dispatch<React.SetStateAction<string | null>>;
	placeholder: string;
	style: string;
	reduceTime: number;
	readOnly: boolean;
};
export default function Input({
	state,
	setstate,
	reduceTime = 200,
	style = InputStyle,
	placeholder,
	readOnly = false,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	let timer: NodeJS.Timeout;
	const handleText: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			setstate(e.target.nodeValue);
		}, reduceTime);
	};

	useEffect(() => {
		if (inputRef.current) {
			if (state) {
				inputRef.current.value = state;
			}
		}
	}, [state, inputRef]);

	return (
		<input
			disabled={readOnly}
			ref={inputRef}
			placeholder={placeholder}
			name={placeholder}
			className={style}
			onChange={handleText}
		/>
	);
}
