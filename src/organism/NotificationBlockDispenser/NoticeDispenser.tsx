import React, { useContext } from 'react';
import { NoticeContext } from './hook';
import NotificationBlock from './NoticeBlock';

export default function NoticeDispenser() {
	const noticestore = useContext(NoticeContext);

	return (
  <div className="fixed bottom-1 flex w-[100vw] flex-col-reverse items-center gap-1 border-sky-100">
    {Object.entries(noticestore.noticeObj).map(([symbol, notice], i) => {
				if (notice) {
					return (
  <NotificationBlock key={symbol} isMount={notice.isMount} noticeId={notice.id}>
    {notice.component}
  </NotificationBlock>
					);
				}
				return '';
			})}
  </div>
	);
}
