import { getDataFromStorage, setDataToStorage } from '../../../utility/utility';
import { RE_TRANSCRIBE_TIME_MS } from '../data-client/constant';

export const setRecentTranscriptTimeNow = () => {
	const date = new Date();
	const currentDate = date.getDate();
	const currentTime = date.getTime();
	const timeStrValue = `${currentDate}/${currentTime}`;
	setDataToStorage('recentTranscriptTime', timeStrValue);
	return timeStrValue;
};
const getRecentTranscriptTimeFromLocalStorage = (): string => {
	const time: string | null = getDataFromStorage('recentTranscriptTime');

	if (!time) {
		return setRecentTranscriptTimeNow();
	}

	return time;
};

export const getIsRecentTranscriptTimePassed = (): boolean => {
	const strValue = getRecentTranscriptTimeFromLocalStorage();
	const date = new Date();
	const currentDate = date.getDate();
	const currentTime = date.getTime();
	const [transcriptDate, transcriptTime] = strValue.split('/').map((str) => Number(str));
	if (currentDate > transcriptDate) {
		return true;
	}
	if (currentDate < transcriptDate) {
		return false;
	}

	const isPassed = currentTime - Number(transcriptTime) > RE_TRANSCRIBE_TIME_MS;
	return isPassed;
};
