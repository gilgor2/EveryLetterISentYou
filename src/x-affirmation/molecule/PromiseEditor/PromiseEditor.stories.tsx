import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import PromiseEditor from './PromiseEditor';

const meta: Meta<typeof PromiseEditor> = {
	title: 'PromiseEditor',
	tags: ['autodocs'],
	component: PromiseEditor,
	// args: { isFocused: true },
};

export default meta;
type Story = StoryObj<typeof PromiseEditor>;

export const Default: Story = {
	args: {},
};

const promise = '나는 의지가 강한 사람이다.';

function StateProvider({ isFocused = true }: { isFocused?: boolean }) {
	const [text, settext] = useState('');
	const [isEnter, setisEnter] = useState(false);
	return (
  <PromiseEditor
    state={text}
    setstate={settext}
    isCompleted={isEnter}
    isFocused={isFocused}
    onEnter={() => {
				setisEnter(true);
			}}
		/>
	);
}
export const Writing: Story = {
	render: () => <StateProvider />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), promise);

		await expect(canvas.getByRole('button')).toBeInTheDocument();
	},
};

export const OnEnter: Story = {
	render: () => <StateProvider />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByRole('textbox'), promise);

		await userEvent.click(canvas.getByRole('button'));

		await expect(canvas.getByTestId('deleteButton')).toBeInTheDocument();
	},
};

export const IsFocusedWell: Story = {
	render: () => <StateProvider isFocused />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.keyboard(promise);

		await expect(canvas.getByRole('button')).toBeInTheDocument();
	},
};
