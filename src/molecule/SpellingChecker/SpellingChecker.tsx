import React, { useEffect, useRef, useState } from 'react';
import TextArea from '../../atom/TextArea/TextArea';

type Props = {
	onSpellCorrect: (isCorrect: boolean) => void;
	answer: string;
	className?: string;
	readonly?: boolean;
	isActive?: boolean;
};
export default function SpellingChecker({
	answer,
	onSpellCorrect,
	className = '',
	readonly = false,
	isActive = false,
}: Props) {
	// textbox state
	const [spelled, setspelled] = useState('');
	const handleTextAreaChange = (val: string) => {
		if (val === answer) {
			onSpellCorrect(true);
		}
		if (val !== answer) {
			onSpellCorrect(false);
		}
		setspelled(val);
	};

	// red on wrong
	const wronSpellingStartIndex = spelled.split('').findIndex((char, i) => char !== answer[i]);
	const checkisWrong = (i: number) => wronSpellingStartIndex > -1 && i >= wronSpellingStartIndex;

	// assure total height to be text height
	const ref = useRef<HTMLDivElement>(null);
	const [textBoxHeightClassName, settextBoxHeightClassName] = useState('pb-1');
	useEffect(() => {
		if (ref.current) {
			settextBoxHeightClassName(`${ref.current?.offsetHeight}px`);
		}
	}, [ref]);

	return (
  <div
    className={`relative ${className} ${readonly && 'pointer-events-none'}`}
    style={{ height: textBoxHeightClassName }}
		>
    {/* placeholder */}
    <div className="absolute left-0 top-0 w-[100%] break-all text-4 text-tg" ref={ref}>
      {answer}
    </div>
    {/* textare which is transparent */}
    <div className="absolute">
      <TextArea
        disable={!isActive}
        tabIndex={-1}
        state={spelled}
        setstate={handleTextAreaChange as React.Dispatch<React.SetStateAction<string>>}
        className="text-4 text-transparent opacity-0"
        isFocused={isActive}
      />
    </div>
    {/* actual text shown */}
    <div className="absolute break-all">
      {spelled.split('').map((char, i) => (
        <span
          key={i}
          className={`${checkisWrong(i) ? 'text-redd' : 'text-black'} z-10 text-4`}
          data-testid={checkisWrong(i) && 'spelledWrong'}
        >
          {char}
        </span>
				))}
    </div>
  </div>
	);
}
