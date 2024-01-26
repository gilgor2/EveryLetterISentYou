import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import UnderlineContainer from './UnderlineContainer';

const meta: Meta<typeof UnderlineContainer> = {
	title: 'UnderlineContainer',
	tags: ['autodocs'],
	component: UnderlineContainer,
};

export default meta;
type Story = StoryObj<typeof UnderlineContainer>;

export const Default: Story = {
	args: { children: <input placeholder="here!" /> },
};

export const Focus: Story = {
	args: { children: <input placeholder="here!" /> },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.queryByTestId('underline')).not.toBeInTheDocument();

		await userEvent.click(canvas.getByPlaceholderText('here!'));

		await expect(canvas.getByTestId('underline').offsetWidth).toBeGreaterThan(1);
	},
};

export const Active: Story = {
	args: { active: true, children: <input placeholder="here!" /> },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByPlaceholderText('here!'));
		fireEvent.blur(canvas.getByPlaceholderText('here!'));

		await expect(canvas.getByTestId('underline').offsetWidth).toBeGreaterThan(1);
	},
};

export const Disable: Story = {
	args: { active: true, children: <input placeholder="here!" />, disable: true },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByPlaceholderText('here!'));

		await expect(canvas.queryByTestId('underline')).not.toBeInTheDocument();
	},
};
