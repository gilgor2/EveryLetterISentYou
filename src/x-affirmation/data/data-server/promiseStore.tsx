import { useMemo } from 'react';
import { generateUniqueId } from '../../../utility/utility';
import useStateFromStorage from '../../../utility/hook/useStateFromStorage';
import { Promise } from '../../type/promise';

const usePromiseListStore = () => {
	const [promiseList, setpromiseList] = useStateFromStorage<Promise[]>('promiseList', [
		{
 text: '', id: 'tmp', transcribeCnt: 0, date: new Date(),
},
		// promiseList.length===0 을 이용하기 위해 기본 값 하나 넣어둠
	]);

	const promiseStore = useMemo(() => {
		const addAllCnt = () => {
			setpromiseList((list) => {
				const tmpList = list.map(
					(promiseObj): Promise => ({ ...promiseObj, transcribeCnt: promiseObj.transcribeCnt + 1 }),
				);
				return tmpList;
			});
		};

		const addPromise = (text: string) => {
			const newPromise: Promise = {
				text,
				id: generateUniqueId(),
				transcribeCnt: 0,
				date: new Date(),
			};
			setpromiseList((list) => [...list, newPromise]);
		};

		const deletePromise = (id: string) => {
			setpromiseList((list) => list.filter((promiseObj) => promiseObj.id !== id));
		};

		const getPromiseList = () => promiseList;

		return {
			getPromiseList,
			addAllCnt,
			addPromise,
			deletePromise,
		};
	}, [promiseList, setpromiseList]);

	return { ...promiseStore };
};

export default usePromiseListStore;
