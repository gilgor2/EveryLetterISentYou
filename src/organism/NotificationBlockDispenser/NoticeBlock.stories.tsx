import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import NoticeBlock from './NoticeBlock';
import { sleep } from '../../utility/utility';

const meta: Meta<typeof NoticeBlock> = {
	title: 'NoticeBlock',
	tags: ['autodocs'],
	component: NoticeBlock,
};

export default meta;
type Story = StoryObj<typeof NoticeBlock>;

export const Default: Story = {
	args: {
		isMount: true,
		noticeId: '123',
	},
};

function NoticeBlockOpener() {
	const [isMount, setisMount] = useState(false);
	const openBlock = () => {
		setisMount(true);
	};
	return (
  <button type="button" title="provider" onClick={openBlock} onKeyDown={openBlock}>
    <NoticeBlock isMount={isMount} noticeId="123" onAnimationEnd={() => {}}>
      <div title="child">hey!</div>
    </NoticeBlock>
  </button>
	);
}
export const OpenAnimation: Story = {
	render: () => <NoticeBlockOpener />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const provider = canvas.getByTitle('provider');

		await userEvent.click(provider);
	},
};

const fn = jest.fn();
function NoticeBlockCloser() {
	const [isMount, setisMount] = useState(true);
	const closeBlock = () => {
		setisMount(false);
	};
	return (
  <button type="button" title="provider" onClick={closeBlock} onKeyDown={closeBlock}>
    <NoticeBlock isMount={isMount} noticeId="123" onAnimationEnd={fn}>
      <div title="child">hey!</div>
    </NoticeBlock>
  </button>
	);
}
export const CloseAnimation: Story = {
	render: () => <NoticeBlockCloser />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const provider = canvas.getByTitle('provider');

		await userEvent.click(provider);
		await sleep(3000);

		await expect(fn).toBeCalled();
	},
};
