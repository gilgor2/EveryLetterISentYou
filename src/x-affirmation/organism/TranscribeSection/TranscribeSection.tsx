import React, { useContext, useState } from 'react';
import PromiseTranscribor from '../../molecule/PromiseTranscribor/PromiseTranscribor';
import { AffirmationContext } from '../../data/context/AffirmationContext';

export default function TranscribeSection({ onSubmit = () => {} }: { onSubmit?: () => void }) {
	const store = useContext(AffirmationContext);

	const [currentTranscriborIndex, setcurrentTranscriborIndex] = useState(0);

	const onDoneEachPromise = (i: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
		setcurrentTranscriborIndex((index) => index + 1);
	};

	return (
  <div data-testid="transcribeSection">
    {store.getPromiseList().map((promise, i) => (
      <PromiseTranscribor
        isFocused={i === currentTranscriborIndex}
        key={promise.id}
        text={promise.text}
        onDone={i < store.getPromiseList().length - 1 ? onDoneEachPromise(i) : onSubmit}
      />
			))}
  </div>
	);
}
