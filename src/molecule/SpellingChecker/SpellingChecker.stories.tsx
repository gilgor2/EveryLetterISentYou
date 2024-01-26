import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import SpellingChecker from './SpellingChecker';

const meta: Meta<typeof SpellingChecker> = {
	title: 'SpellingChecker',
	tags: ['autodocs'],
	component: SpellingChecker,
	args: { isActive: true },
};

export default meta;
type Story = StoryObj<typeof SpellingChecker>;

const answer = '안녕하세 요 !';
const writing = '안 녕 핫';
const longButWrong = '안 녕 안녕안녕하세요';

export const Default: Story = {
	args: { answer, onSpellCorrect: jest.fn() },
};

export const SpelledWrong: Story = {
	args: { answer, onSpellCorrect: jest.fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), writing);

		await expect(canvas.getAllByTestId('spelledWrong')[0]).toBeInTheDocument();
		await expect(args.onSpellCorrect).not.toBeCalledWith(true);
	},
};

export const Correct: Story = {
	args: { answer, onSpellCorrect: jest.fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), answer);

		await expect(canvas.queryByTestId('spelledWrong')).not.toBeInTheDocument();
		await expect(args.onSpellCorrect).toBeCalledWith(true);
	},
};

export const WrongLong: Story = {
	args: { answer, onSpellCorrect: jest.fn() },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), longButWrong);

		await expect(canvas.getAllByTestId('spelledWrong')[0]).toBeInTheDocument();
		await expect(args.onSpellCorrect).not.toBeCalledWith(true);
	},
};

const tooLong = 'qwertyuiopqwertyuiopqwertyuiop';
export const BrCheck: Story = {
	args: { answer: tooLong, onSpellCorrect: jest.fn(), className: 'w-[200px]' },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), tooLong);
	},
};

export const BrCheckShortAnswer: Story = {
	args: { answer, onSpellCorrect: jest.fn(), className: 'w-[200px]' },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), tooLong);
	},
};
