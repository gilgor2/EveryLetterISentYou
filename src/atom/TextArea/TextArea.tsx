import React, { useEffect } from 'react';
import useTypeReduce from '../../utility/hook/useTypeReduce';

type TextAreaProps = {
	state: string;
	setstate: React.Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
	reduceTime?: number;
	readOnly?: boolean;
	className?: string;
	disable?: boolean;
	isFocused?: boolean;
	tabIndex?: number;
};
export default function TextArea({
	state,
	setstate,
	placeholder = '',
	reduceTime = 0,
	readOnly = false,
	className = '',
	disable = false,
	isFocused = false,
	tabIndex = 0,
}: TextAreaProps) {
	const { ref, handleReduceText } = useTypeReduce<HTMLTextAreaElement>({
		state,
		setstate,
		reduceTime,
	});

	const handleResize = () => {
		if (ref.current) {
			ref.current.style.height = 'auto';
			ref.current.style.height = `${ref.current?.scrollHeight}px`;
		}
	};

	useEffect(() => {
		if (ref.current) {
			ref.current.style.height = `${ref.current?.scrollHeight}px`;
			if (isFocused) {
				ref.current.focus();
			}
		}
	}, [ref, isFocused]);
	return (
  <textarea
    tabIndex={tabIndex}
    ref={ref}
    disabled={readOnly}
    placeholder={placeholder}
    name={placeholder}
    rows={1}
    readOnly={disable}
    className={`resize-none bg-transparent focus:outline-none ${className}`}
    onChange={(e) => {
				handleResize();
				handleReduceText(e);
			}}
		/>
	);
}
