import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import TranscribeSection from './TranscribeSection';
import usePromiseListStore from '../../data/data-server/promiseStore';
import { AffirmationContext } from '../../data/context/AffirmationContext';

const meta: Meta<typeof TranscribeSection> = {
	title: 'x-affirmation/organism/TranscribeSection/TranscribeSection.stories.tsx',
	tags: ['autodocs'],
	component: TranscribeSection,
};

export default meta;
type Story = StoryObj<typeof TranscribeSection>;

export const Default: Story = {
	args: {},
};

function TranscribeSectionWithStore() {
	const promiseListStore = usePromiseListStore();
	const addPromise = () => {
		promiseListStore.addPromise('promise');
	};
	return (
  <AffirmationContext.Provider value={promiseListStore}>
    <button type="button" onClick={addPromise} />
    <TranscribeSection />
  </AffirmationContext.Provider>
	);
}

export const TabOnEnter: Story = {
	render: () => <TranscribeSectionWithStore />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// context에 2개의 promise를 미리 추가
		await userEvent.click(canvas.getAllByRole('button')[0]);
		await userEvent.click(canvas.getAllByRole('button')[0]);

		// test실행
		await userEvent.type(canvas.getAllByRole('textbox')[0], 'promise');
		await userEvent.click(canvas.getAllByRole('button')[1]);

		await userEvent.keyboard('promise');

		await expect(canvas.getAllByRole('textbox')[0]).toHaveValue('promise');
	},
};
