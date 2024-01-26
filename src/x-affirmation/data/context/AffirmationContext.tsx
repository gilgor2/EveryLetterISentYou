import { createContext } from 'react';

export const promiseStore: PromiseStore = {
	getPromiseList: () => [],
	addAllCnt: () => {},
	addPromise: () => {},
	deletePromise: () => {},
};
export const AffirmationContext = createContext({ ...promiseStore });
