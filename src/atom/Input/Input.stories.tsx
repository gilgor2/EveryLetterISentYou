import Input from './Input';

export default {
	component: Input,
	title: 'Input',
	tags: ['autodocs'],
};
export const Default = {
	args: { state: '', setstate: () => {}, placeholder: 'type here' },
};
export const InitialState = {
	args: { state: 'hello', setstate: () => {}, placeholder: 'type here' },
};
export const Styled = {
	args: { state: 'hello', setstate: () => {}, placeholder: 'type here', style: 'text-red-700' },
};
