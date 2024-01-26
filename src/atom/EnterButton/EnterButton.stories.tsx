import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import EnterButton from './EnterButton';

const meta: Meta<typeof EnterButton> = {
	title: 'EnterButton',
	tags: ['autodocs'],
	component: EnterButton,
};

export default meta;
type Story = StoryObj<typeof EnterButton>;

export const Default: Story = {
	args: { active: true, onEnter: jest.fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByText('Enter');

		await userEvent.click(button);

		await expect(args.onEnter).toBeCalled();
	},
};

export const NotActive: Story = {
	args: { active: false, onEnter: jest.fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = await canvas.getByText('Enter');

		await userEvent.click(button);

		await expect(args.onEnter).not.toBeCalled();
	},
};
