import React, { SetStateAction, useState } from 'react';
import UnderlineContainer from '../../../molecule/UnderlineContainer/UnderlineContainer';
import TextArea from '../../../atom/TextArea/TextArea';
import DeleteButton from '../../../atom/DeleteButton/DeleteButton';
import EnterButton from '../../../atom/EnterButton/EnterButton';

type Props = {
	state: string;
	setstate: React.Dispatch<SetStateAction<string>>;
	placeholder?: string;
	onEnter?: () => void;
	onDelete?: () => void;
	isCompleted?: boolean;
	isFocused?: boolean;
};
export default function PromiseEditor({
	state,
	setstate = () => {},
	placeholder = '',
	onEnter = () => {},
	onDelete = () => {},
	isCompleted = false,
	isFocused = false,
}: Props) {
	const onPressEnter = () => {
		onEnter();
	};
	return (
  <div className="relative flex h-max items-center justify-start gap-4">
    <UnderlineContainer disable={isCompleted}>
      <TextArea
        state={state}
        setstate={setstate}
        className="w-[500px] text-4"
        placeholder={placeholder}
        disable={isCompleted}
        isFocused={isFocused}
      />
    </UnderlineContainer>
    <div className="w-[80px]" />
    {isCompleted && <DeleteButton onClick={onDelete} className="absolute right-0 text-4" />}
    {!isCompleted && !!state && (
    <EnterButton onEnter={onPressEnter} active className="absolute right-0 text-2" />
			)}
  </div>
	);
}
