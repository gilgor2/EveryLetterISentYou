import {
 ReactElement, createContext, useCallback, useMemo, useState,
} from 'react';
import { generateUniqueId } from '../../utility/utility';

export type Notice = {
	component: ReactElement;
	isMount: boolean;
	id: string;
};

export type NoticeObj = { [id: string]: Notice | null };
export interface DispenserStore {
	noticeObj: { [id: string]: Notice | null };
	openNotice: (noticeComponent: ReactElement) => string;
	closeNotice: (id: string) => void;
	deleteNoticeFromStore: (id: string) => void;
	openNoticeForMs: (noticeComponent: ReactElement, ms: number) => void;
}
export const noticeStore: DispenserStore = {
	noticeObj: {},

	openNotice: (noticeComponent) => {
		const id = generateUniqueId();
		const { noticeObj } = noticeStore;
		const tmpMap = { ...noticeObj };

		tmpMap[id] = { component: noticeComponent, isMount: true, id };
		noticeStore.noticeObj = tmpMap;
		return id;
	},

	closeNotice: (id) => {
		const { noticeObj } = noticeStore;
		const tmpMap = { ...noticeObj };
		const targetNotice = tmpMap[id];

		if (targetNotice) {
			targetNotice.isMount = false;
			tmpMap[id] = targetNotice;
			noticeStore.noticeObj = tmpMap;
		}
	},

	deleteNoticeFromStore: (id) => {
		const { noticeObj } = noticeStore;
		const tmpMap = { ...noticeObj };
		tmpMap[id] = null;
		noticeStore.noticeObj = tmpMap;
	},

	openNoticeForMs: (noticeComponent, ms) => {
		const id = noticeStore.openNotice(noticeComponent);
		setTimeout(() => {
			noticeStore.closeNotice(id);
		}, ms);
	},
};

export const useNotice = () => {
	const [noticeObj, setnoticeObj] = useState<NoticeObj>({});

	const store = useMemo<DispenserStore>(() => {
		const openNotice = (noticeComponent: ReactElement): string => {
			const id = generateUniqueId();
			setnoticeObj((state) => {
				const tmpNoticeObj = { ...state };
				tmpNoticeObj[id] = { component: noticeComponent, isMount: true, id };
				return tmpNoticeObj;
			});
			return id;
		};

		const closeNotice = (id: string) => {
			setnoticeObj((state) => {
				const tmpNoticeObj = { ...state };
				const target = tmpNoticeObj[id];
				if (target) {
					target.isMount = false;
					return tmpNoticeObj;
				}
				return state;
			});
		};

		const deleteNoticeFromStore = (id: string) => {
			setnoticeObj((state) => {
				const tmpNoticeObj = { ...state };
				delete tmpNoticeObj[id];
				return tmpNoticeObj;
			});
		};

		const openNoticeForMs = (noticeComponent: ReactElement, ms: number) => {
			const id = openNotice(noticeComponent);
			setTimeout(() => {
				closeNotice(id);
			}, ms);
		};

		return {
			noticeObj,
			openNotice,
			closeNotice,
			deleteNoticeFromStore,
			openNoticeForMs,
		};
	}, [noticeObj]);
	return store;
};

export const NoticeContext = createContext(noticeStore);
