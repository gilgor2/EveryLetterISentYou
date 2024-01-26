import { useEffect, useRef } from 'react';

type ReducerProps = {
	state: string | null;
	setstate: React.Dispatch<React.SetStateAction<string>>;
	reduceTime: number;
};
const useTypeReduce = <T extends HTMLInputElement | HTMLTextAreaElement>({
	state,
	setstate,
	reduceTime,
}: ReducerProps) => {
	const ref = useRef<T>(null);

	let timer: NodeJS.Timeout;
	const handleReduceText: React.ChangeEventHandler<T> = (e: React.ChangeEvent<T>) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			setstate(e.target.value);
		}, reduceTime);
	};

	useEffect(() => {
		if (ref.current) {
			if (state) {
				ref.current.value = state;
			}
			if (state === '') {
				ref.current.value = '';
			}
		}
	}, [state, ref]);

	if (reduceTime === 0) {
		const handleText: React.ChangeEventHandler<T> = (e: React.ChangeEvent<T>) => {
			setstate(e.target.value);
		};
		return { ref, handleReduceText: handleText };
	}

	return { ref, handleReduceText };
};
export default useTypeReduce;
