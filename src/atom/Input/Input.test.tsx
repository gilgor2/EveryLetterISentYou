import { composeStories } from '@storybook/react';
import * as stories from './Input.stories';

describe('Input', () => {
	const { Default } = composeStories(stories);
	it('result', async () => {});
	// text입력 시 200ms뒤에 state변동이 되는지 확인
});
