import React from 'react';
import usePromiseListStore from '../data-server/promiseStore';
import { NoticeContext, useNotice } from '../../../organism/NotificationBlockDispenser/hook';
import { AffirmationContext } from './AffirmationContext';

export default function AffirmationContextProvider({ children }: { children: React.ReactElement }) {
	const promiseListStore = usePromiseListStore();
	const noticeStore = useNotice();

	return (
  <NoticeContext.Provider value={noticeStore}>
    <AffirmationContext.Provider value={{ ...promiseListStore }}>
      {children}
    </AffirmationContext.Provider>
  </NoticeContext.Provider>
	);
}
