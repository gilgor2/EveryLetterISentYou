import React from 'react';
import useTypeReduce from '../../utility/hook/useTypeReduce';

type InputProps = {
	state: string;
	setstate: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
	reduceTime?: number;
	readOnly?: boolean;
};
export default function Input({
	state,
	setstate,
	placeholder,
	reduceTime = 0,
	readOnly = false,
}: InputProps) {
	const { ref, handleReduceText } = useTypeReduce<HTMLInputElement>({
		state,
		setstate,
		reduceTime,
	});

	return (
  <input
    disabled={readOnly}
    ref={ref}
    placeholder={placeholder}
    name={placeholder}
    onChange={(e) => {
				handleReduceText(e);
			}}
    className="bg-transparent focus:outline-none"
		/>
	);
}
