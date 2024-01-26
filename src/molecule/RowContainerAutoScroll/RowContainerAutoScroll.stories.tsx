import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import RowContainerAutoScroll from './RowContainerAutoScroll';

const meta: Meta<typeof RowContainerAutoScroll> = {
	title: 'molecule/RowContainerAutoScroll/RowContainerAutoScroll.stories.tsx',
	tags: ['autodocs'],
	component: RowContainerAutoScroll,
};

export default meta;
type Story = StoryObj<typeof RowContainerAutoScroll>;

export const Default: Story = {
	args: { children: <div>aaa</div> },
};

export const FastOnHover: Story = {
	args: { children: <div>aaa</div>, isFastOnHover: true },
};
