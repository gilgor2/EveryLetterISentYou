import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import React, { useContext } from 'react';
import { expect } from '@storybook/jest';
import NoticeDispenser from './NoticeDispenser';
import { sleep } from '../../utility/utility';
import { NoticeContext, useNotice } from './hook';

const meta: Meta<typeof NoticeDispenser> = {
	title: 'NoticeDispenser',
	tags: ['autodocs'],
	component: NoticeDispenser,
};

export default meta;
type Story = StoryObj<typeof NoticeDispenser>;

export const Default: Story = {
	args: {},
};

function NoticeBlockOpener() {
	const noticeStore = useNotice();

	const openBlock = () => {
		noticeStore.openNotice(<div title="child">Hey!</div>);
	};

	return (
  <NoticeContext.Provider value={noticeStore}>
    <button type="button" title="provider" onClick={openBlock} onKeyDown={openBlock}>
      <NoticeDispenser />
    </button>
  </NoticeContext.Provider>
	);
}
export const OpenNotice: Story = {
	render: () => <NoticeBlockOpener />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const provider = canvas.getByTitle('provider');

		await userEvent.click(provider);

		await expect(canvas.getByTitle('child'));
	},
};

function NoticeBlockCloser() {
	const noticeStore = useNotice();
	const closeBlock = async () => {
		const id = noticeStore.openNotice(<div title="child">original</div>);
		await sleep(1000);
		noticeStore.closeNotice(id);
	};

	return (
  <NoticeContext.Provider value={noticeStore}>
    <button type="button" title="provider" onClick={closeBlock} onKeyDown={closeBlock}>
      <NoticeDispenser />
    </button>
  </NoticeContext.Provider>
	);
}
export const CloseAnimation: Story = {
	render: () => <NoticeBlockCloser />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const provider = canvas.getByTitle('provider');

		await userEvent.click(provider);
		await sleep(2000);

		await expect(canvas.queryByText('original')).not.toBeInTheDocument();
	},
};
