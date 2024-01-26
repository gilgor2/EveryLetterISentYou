import React from 'react';
import { jest, expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Input from './Input';
import { sleep } from '../../utility/utility';

const meta: Meta<typeof Input> = {
	title: 'Input',
	tags: ['autodocs'],
	component: Input,

	argTypes: {
		setstate: { action: 'onChange' },
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const StateSameAsValue: Story = {
	args: {
		setstate: jest.fn(),
		placeholder: 'StateSameAsValue',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('StateSameAsValue');
		await userEvent.type(input, 'ha');
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
		const input = canvas.getByPlaceholderText('Reducer');
		await userEvent.type(input, 'ha');
		await sleep(200);
		await sleep(200);
		await expect(args.setstate).toBeCalledWith('ha');
	},
};
export const InputContainer: Story = {
	args: { placeholder: 'containerCheck' },
	decorators: [
		(Story) => (
			<div className="bg-red-500 w-60 rounded-sm p-4">
				<Story />
			</div>
		),
	],
};

export const OriginalState: Story = {
	args: { state: 'hello' },
};
