import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import CheckSign from './CheckSign';

const meta: Meta<typeof CheckSign> = {
	title: 'CheckSign',
	tags: ['autodocs'],
	component: CheckSign,
};

export default meta;
type Story = StoryObj<typeof CheckSign>;

export const Default: Story = {
	args: {},
};
