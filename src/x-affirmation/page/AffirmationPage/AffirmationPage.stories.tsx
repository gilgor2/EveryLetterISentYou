import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import AffirmationPage from './AffirmationPage';
import { MAX_PROMISE_COUNT, NOTICE_MESSAGE } from '../../data/data-client/constant';
import { NoticeContext, useNotice } from '../../../organism/NotificationBlockDispenser/hook';
import { AffirmationContext } from '../../data/context/AffirmationContext';
import usePromiseListStore from '../../data/data-server/promiseStore';
import { sleep } from '../../../utility/utility';
import { setRecentTranscriptTimeNow } from '../../data/data-server/recentTranscriptTime';

function AffirmationContextProvider({ children }: { children: React.ReactElement }) {
	const noticeStore = useNotice();
	const promiseListStore = usePromiseListStore();

	return (
  <NoticeContext.Provider value={noticeStore}>
    <AffirmationContext.Provider
      value={promiseListStore}
    >
      {children}
    </AffirmationContext.Provider>
  </NoticeContext.Provider>
	);
}
const meta: Meta<typeof AffirmationPage> = {
	title: 'x-affirmation/page/AffirmationPage/AffirmationPage.stories.tsx',
	tags: ['autodocs'],
	component: AffirmationPage,

};

export default meta;
type Story = StoryObj<typeof AffirmationPage>;

export const NoPromise: Story = {
	decorators: (Story) => {
		localStorage.clear();
		localStorage.setItem('promiseList', '[]');
		return (
  <AffirmationContextProvider>
    <Story />
  </AffirmationContextProvider>
);
},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await sleep(10);
		await expect(
			canvas.getAllByText(NOTICE_MESSAGE.ENTER_PROMISE)[0],
		).toBeInTheDocument();
	},
};

export const TenPromise: Story = {
	decorators: (Story) => {
		localStorage.clear();
		localStorage.setItem('promiseList', '[]');
		return (
  <AffirmationContextProvider>
    <Story />
  </AffirmationContextProvider>
);
},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		for (let i = 0; i < MAX_PROMISE_COUNT; i += 1) {
			await userEvent.type(
				canvas.getAllByRole('textbox')[canvas.getAllByRole('textbox').length - 1],
				'promise',
			);
			await userEvent.keyboard('[Tab]');
			await userEvent.keyboard('[Enter]');
		}

		await userEvent.type(
			canvas.getAllByRole('textbox')[canvas.getAllByRole('textbox').length - 1],
			'promise',
		);

		await expect(canvas.getAllByRole('textbox').length).toBe(MAX_PROMISE_COUNT);

		await expect(
			canvas.getByText(`다짐은 ${MAX_PROMISE_COUNT}개까지만 작성해주세요.`),
		).toBeInTheDocument();
	},
};

export const ExhibitSection: Story = {
	decorators: (Story) => {
		localStorage.clear();
		localStorage.setItem('promiseList', JSON.stringify([{
 text: '이이잉', id: 'tmp', transcribeCnt: 0, date: new Date(),
}]));
		setRecentTranscriptTimeNow();
		return (
  <AffirmationContextProvider>
    <Story />
  </AffirmationContextProvider>
);
},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId('exhibitSection')).toBeInTheDocument();
	},
};

export const TranscribeSection: Story = {
	decorators: (Story) => {
		localStorage.clear();
		localStorage.setItem('promiseList', JSON.stringify([{
 text: '이이잉', id: 'tmp', transcribeCnt: 0, date: new Date(),
}]));
		localStorage.setItem('recentTranscriptTime', JSON.stringify('0/1706187948282'));

		return (
  <AffirmationContextProvider>
    <Story />
  </AffirmationContextProvider>
);
},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId('transcribeSection')).toBeInTheDocument();
	},
};

export const DoneTranscribe: Story = {
	decorators: (Story) => {
		localStorage.clear();
		localStorage.setItem('promiseList', JSON.stringify([{
 text: '이이잉', id: 'tmp', transcribeCnt: 0, date: new Date(),
}]));
		localStorage.setItem('recentTranscriptTime', JSON.stringify('0/1706187948282'));

		return (
  <AffirmationContextProvider>
    <Story />
  </AffirmationContextProvider>
);
},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getAllByRole('textbox')[0], '이이잉');
		await userEvent.keyboard('[Enter]');
		await sleep(10);
		await expect(canvas.getByText(NOTICE_MESSAGE.WELL_DONE)).toBeInTheDocument();
		await expect(canvas.getByTestId('exhibitSection')).toBeInTheDocument();
	},
};

export const EditSectionWhenEditButton: Story = {
	decorators: (Story) => {
		localStorage.clear();
		localStorage.setItem('promiseList', JSON.stringify([{
 text: '이이잉', id: 'tmp', transcribeCnt: 0, date: new Date(),
}]));
		return (
  <AffirmationContextProvider>
    <Story />
  </AffirmationContextProvider>
);
},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByTestId('editButton'));

		await expect(canvas.getByTestId('editSection')).toBeInTheDocument();
	},
};
