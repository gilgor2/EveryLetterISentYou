import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import PromiseTranscribor from './PromiseTranscribor';

const meta: Meta<typeof PromiseTranscribor> = {
	title: 'PromiseTranscribor',
	tags: ['autodocs'],
	args: { isFocused: true },
	component: PromiseTranscribor,
};

export default meta;
type Story = StoryObj<typeof PromiseTranscribor>;

const promise = '나는 의지가 강한 사람이다.';
export const Default: Story = {
	args: { text: promise },
};

export const Writing: Story = {
	args: { text: promise },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), '나는 의지가 강하');
	},
};

export const Correct: Story = {
	args: { text: promise },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), promise);

		await expect(canvas.getByRole('button')).toBeInTheDocument();
	},
};

export const OnComplete: Story = {
	args: { text: promise, onDone: jest.fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), promise);

		await userEvent.click(canvas.getByRole('button'));

		await expect(canvas.getByTestId('checkSign')).toBeInTheDocument();

		await expect(args.onDone).toBeCalled();
	},
};

export const Focus: Story = {
	args: { text: promise, onDone: jest.fn() },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.keyboard(promise);
		await userEvent.keyboard('[Enter]');

		await expect(canvas.getByTestId('checkSign')).toBeInTheDocument();
	},
};
