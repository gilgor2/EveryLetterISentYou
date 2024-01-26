import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import EditSection from './EditSection';
import usePromiseListStore from '../../data/data-server/promiseStore';
import { AffirmationContext } from '../../data/context/AffirmationContext';

const meta: Meta<typeof EditSection> = {
	title: 'x-affirmation/organism/EditSection/EditSection.stories.tsx',
	tags: ['autodocs'],
	component: EditSection,
};

export default meta;
type Story = StoryObj<typeof EditSection>;

export const Default: Story = {
	args: {},
};

function EditSectionWithStore() {
	const promiseListStore = usePromiseListStore();

	return (
  <AffirmationContext.Provider value={promiseListStore}>
    <EditSection />
  </AffirmationContext.Provider>
	);
}
localStorage.setItem = jest.fn();

export const AddPromise: Story = {
	render: () => <EditSectionWithStore />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		// 다짐 추가
		await userEvent.type(
			canvas.getAllByRole('textbox')[canvas.getAllByRole('textbox').length - 1],
			'promise',
		);
		const prevLength = canvas.getAllByRole('textbox').length;

		await userEvent.click(canvas.getAllByRole('button')[canvas.getAllByRole('button').length - 1]);

		await expect(canvas.getAllByRole('textbox').length).toBe(prevLength + 1);
	},
};

function EditSectionWithStore2() {
	const promiseListStore = usePromiseListStore();

	return (
  <AffirmationContext.Provider value={promiseListStore}>
    <EditSection />
  </AffirmationContext.Provider>
	);
}
export const DeletePromise: Story = {
	render: () => <EditSectionWithStore2 />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// 다짐 추가
		await userEvent.type(
			canvas.getAllByRole('textbox')[canvas.getAllByRole('textbox').length - 1],
			'promise',
		);

		await userEvent.click(canvas.getAllByRole('button')[canvas.getAllByRole('button').length - 1]);
		const prevLength = canvas.getAllByRole('textbox').length;
		// 다짐 삭제
		await userEvent.click(
			canvas.getAllByTestId('deleteButton')[canvas.getAllByTestId('deleteButton').length - 1],
		);

		await expect(canvas.getAllByRole('textbox').length).toBe(prevLength - 1);
	},
};

export const Focus: Story = {
	render: () => <EditSectionWithStore2 />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// 다짐 추가
		await userEvent.keyboard('promise');
		const prevLength = canvas.getAllByRole('textbox').length;

		await userEvent.keyboard('[Tab]');

		await userEvent.keyboard('[Enter]');

		await expect(canvas.getAllByRole('textbox').length).toBe(prevLength + 1);
	},
};
