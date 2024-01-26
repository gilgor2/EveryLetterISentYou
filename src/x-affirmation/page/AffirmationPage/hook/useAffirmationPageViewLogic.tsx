import {
 useContext, useEffect, useMemo, useState,
} from 'react';
import { getIsRecentTranscriptTimePassed } from '../../../data/data-server/recentTranscriptTime';
import { AffirmationContext } from '../../../data/context/AffirmationContext';

export const useAffirmationPageViewLogic = () => {
	const promiseListStore = useContext(AffirmationContext);

	const promiseList = promiseListStore.getPromiseList();

	const [isEdit, setisEdit] = useState(false);
	const isTimePassed = getIsRecentTranscriptTimePassed();
	const [isTranscribeComplete, setisTranscribeComplete] = useState(!isTimePassed);
	// 시간이 기준보다 더 경과했는지 확인하고, complete관리
	setInterval(() => {
		setisTranscribeComplete(!isTimePassed);
	}, 3600000);

	// // promiseList가 비었으면 editSection 보여주기
	useEffect(() => {
		if (promiseList.length === 0 && !isEdit) {
			setisEdit(true);
		}
	}, [promiseList]);

	return useMemo(
		() => ({
			isEditSection: isEdit,
			isExhibitSection: !isEdit && isTranscribeComplete,
			isTranscribeSection: !isEdit && !isTranscribeComplete,
			isPromiseListEmpty: promiseList.length === 0,
			handleViewLogicOnEditButton: () => {
				setisEdit((bool) => !bool);
				setisTranscribeComplete(false);
			},
			setTranscribeComplete: () => {
				setisTranscribeComplete(true);
			},
		}),
		[isTranscribeComplete, isEdit, promiseList],
	);
};
