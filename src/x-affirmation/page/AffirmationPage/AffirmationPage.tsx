import React from 'react';
import { useAffirmationPageNotice } from './hook/useAffirmationPageNotice';
import { useAffirmationPageViewLogic } from './hook/useAffirmationPageViewLogic';
import EditSection from '../../organism/EditSection/EditSection';
import ExhibitSection from '../../organism/ExhibitSection/ExhibitSection';
import TranscribeSection from '../../organism/TranscribeSection/TranscribeSection';
import NoticeDispenser from '../../../organism/NotificationBlockDispenser/NoticeDispenser';
import { setRecentTranscriptTimeNow } from '../../data/data-server/recentTranscriptTime';
import ActionButon from '../../../atom/ActionButton/ActionButon';

export default function AffirmationPage() {
	const { openNoticeWhenDoneTranscribe } = useAffirmationPageNotice();

	const {
		isEditSection,
		isExhibitSection,
		isTranscribeSection,
		handleViewLogicOnEditButton,
		setTranscribeComplete,
		isPromiseListEmpty,
	} = useAffirmationPageViewLogic();

	const onDoneTranscribe = () => {
		openNoticeWhenDoneTranscribe();
		setRecentTranscriptTimeNow();
		setTranscribeComplete();
	};

	const onClickEditButton = () => {
		handleViewLogicOnEditButton();
		// setRecentTranscriptTimeNow();
	};

	return (
  <div className="relative flex  h-[100vh] items-center justify-center">
    <div className="pl-[100px]">
      {isEditSection && <EditSection />}

      {isExhibitSection && <ExhibitSection />}

      {isTranscribeSection && <TranscribeSection onSubmit={onDoneTranscribe} />}

    </div>

    {!isPromiseListEmpty && (
    <>
      <div className="w-[100px]" />
      <ActionButon onClick={onClickEditButton} className="w-[40px] top-[50% - 20px] absolute right-10">
        {isEditSection ? '수정 완료' : '새로 다짐하기'}
      </ActionButon>
    </>

			)}
    <NoticeDispenser />
  </div>
	);
}
