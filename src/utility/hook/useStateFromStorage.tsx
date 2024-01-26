import { useEffect, useState } from 'react';
import { getDataFromStorage, setDataToStorage } from '../utility';

type SetStateCallback<T> = (prevState: T) => T;

export default function useStateFromStorage<T>(
	key: string,
	initialState: T,
): [T, (args: T | SetStateCallback<T>) => void] {
	const [state, setstate] = useState<T>(initialState);

	const setstateWithStorage: (args: T | SetStateCallback<T>) => void = (args) => {
		if (typeof args === 'function') {
			const newState = (args as SetStateCallback<T>)(state);
			setDataToStorage(key, newState);
			setstate(newState);
			return;
		}
		setDataToStorage(key, args);
		setstate(args);
	};

	useEffect(() => {
		const data = getDataFromStorage(key);
		if (data) {
			setstate(data);
		}
	}, [key]);

	return [state, setstateWithStorage];
}
