type PromiseStore = {
	getPromiseList: () => Promise[];
	addAllCnt: () => void;
	addPromise: (text: string) => void;
	deletePromise: (id: string) => void;
};
