import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ExhibitSection from './ExhibitSection';

const meta: Meta<typeof ExhibitSection> = {
	title: 'x-affirmation/organism/ExhibitSection/ExhibitSection.stories.tsx',
	tags: ['autodocs'],
	component: ExhibitSection,
};

export default meta;
type Story = StoryObj<typeof ExhibitSection>;

export const Default: Story = {
	args: {},

};
