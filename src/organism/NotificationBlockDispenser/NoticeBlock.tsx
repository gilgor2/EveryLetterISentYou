import React, { ReactNode, useContext } from 'react';
import { NoticeContext } from './hook';

export type NoticeBlockProps = {
	isMount: boolean;
	children: ReactNode;
	noticeId: string;
	onAnimationEnd?: () => void;
};

export default function NoticeBlock({
	isMount,
	noticeId,
	children,
	onAnimationEnd = () => {},
}: NoticeBlockProps) {
	const animation = isMount ? 'animate-appearFromBottom' : 'animate-disappearLeft';
	const noticestore = useContext(NoticeContext);

	return (
  <div
    className={`min-h-120 w-[60vw] rounded-m bg-bgg p-2 backdrop-blur-md ${animation} text-2 [&>*]:font-semibold [&>*]:text-tdg`}
    onAnimationEnd={() => {
				onAnimationEnd();

				if (!isMount) {
					noticestore.deleteNoticeFromStore(noticeId);
				}
			}}
		>
    {children}
  </div>
	);
}
