import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import TextArea from './TextArea';
import { sleep } from '../../utility/utility';

const meta: Meta<typeof TextArea> = {
	title: 'TextArea',
	tags: ['autodocs'],
	component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const StateSameAsValue: Story = {
	args: {
		setstate: jest.fn(),
		placeholder: 'StateSameAsValue',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const textArea = canvas.getByPlaceholderText('StateSameAsValue');
		await userEvent.type(textArea, 'ha');
		await expect(args.setstate).toBeCalledWith('h');
		await expect(args.setstate).toBeCalledWith('ha');
	},
};

export const Reducer: Story = {
	args: {
		setstate: jest.fn(),
		placeholder: 'Reducer',
		reduceTime: 300,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const textArea = canvas.getByPlaceholderText('Reducer');
		await userEvent.type(textArea, 'ha');
		await sleep(400);
		await expect(args.setstate).toBeCalledWith('ha');
	},
};
export const ResizeOnMoutipleRows: Story = {
	args: { placeholder: 'containerCheck', setstate: () => {} },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const textArea = canvas.getByPlaceholderText('containerCheck');
		textArea.style.height = '10px';
		textArea.style.width = '20px';
		const originalHeight = textArea.offsetHeight;

		await userEvent.type(textArea, 'aaaaaaaaa');

		expect(textArea.clientHeight).toBeGreaterThan(originalHeight);
	},
};
