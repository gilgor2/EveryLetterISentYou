import React, { useState } from 'react';
import SpellingChecker from '../../../molecule/SpellingChecker/SpellingChecker';
import EnterButton from '../../../atom/EnterButton/EnterButton';
import CheckSign from '../../../atom/CheckSign/CheckSign';
import UnderlineContainer from '../../../molecule/UnderlineContainer/UnderlineContainer';

type Props = {
	text: string;
	onDone: (e: React.MouseEvent<HTMLButtonElement>) => void;
	isFocused?: boolean;
};
export default function PromiseTranscribor({ text, onDone, isFocused = false }: Props) {
	const [isTranscribeCorrect, setisTranscribeCorrect] = useState(false);
	const [isTranscribeDone, setisTranscribeDone] = useState(false);

	const onSpellCorrect = (isCorrect: boolean) => {
		setisTranscribeCorrect(isCorrect);
	};

	const onEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
		setisTranscribeDone(true);
		onDone(e);
	};

	return (
  <div className="relative flex h-max items-center gap-4">
    <UnderlineContainer disable={!isFocused}>
      <SpellingChecker
        answer={text}
        onSpellCorrect={onSpellCorrect}
        readonly={isTranscribeDone}
        className="w-[600px]"
        isActive={!isTranscribeCorrect && isFocused}
      />
    </UnderlineContainer>
    <div className="w-[80px]" />

    {isTranscribeCorrect && !isTranscribeDone && (
    <EnterButton onEnter={onEnter} active className="absolute right-0 text-2" autoFocus />
			)}
    {isTranscribeDone && <CheckSign className="absolute right-0" />}
  </div>
	);
}
