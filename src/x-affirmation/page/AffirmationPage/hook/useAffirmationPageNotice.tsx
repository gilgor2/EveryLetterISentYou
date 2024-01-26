import React, { useContext, useEffect, useRef } from 'react';
import { NoticeContext } from '../../../../organism/NotificationBlockDispenser/hook';
import { AffirmationContext } from '../../../data/context/AffirmationContext';
import { MAX_PROMISE_COUNT, NOTICE_MESSAGE } from '../../../data/data-client/constant';

export const useAffirmationPageNotice = () => {
	const promiseListStore = useContext(AffirmationContext);
	const noticeStore = useContext(NoticeContext);

	const promiseList = promiseListStore.getPromiseList();

	useEffect(() => {
		const promiseCnt = promiseList.length;
		if (promiseCnt >= MAX_PROMISE_COUNT) {
			noticeStore.openNoticeForMs(<div>{NOTICE_MESSAGE.ENTER_BEFORE_MAX}</div>, 3000);
		}
		if (promiseCnt === 0) {
			noticeStore.openNoticeForMs(<div>{NOTICE_MESSAGE.ENTER_PROMISE}</div>, 3000);
		}
	}, [promiseList]);

	// return function
	const openNoticeWhenDoneTranscribe = () => {
		noticeStore.openNoticeForMs(<div>{NOTICE_MESSAGE.WELL_DONE}</div>, 3000);
	};
	return { openNoticeWhenDoneTranscribe };
};
