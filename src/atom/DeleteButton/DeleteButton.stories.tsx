import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import DeleteButton from './DeleteButton';

const meta: Meta<typeof DeleteButton> = {
	title: 'DeleteButton',
	tags: ['autodocs'],
	component: DeleteButton,
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {
	args: {},
};

const mockedOnclick = jest.fn();
export const OnClick: Story = {
	args: {
		onClick: mockedOnclick,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const button = canvas.getByText('delete');

		await userEvent.click(button);

		await expect(mockedOnclick).toBeCalled();
	},
};
