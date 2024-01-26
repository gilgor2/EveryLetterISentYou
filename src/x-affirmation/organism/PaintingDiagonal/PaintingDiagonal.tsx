import React, { useContext } from 'react';
import { AffirmationContext } from '../../data/context/AffirmationContext';
import RowContainerAutoScroll from '../../../molecule/RowContainerAutoScroll/RowContainerAutoScroll';
import MouseDodgingSpan from '../../../atom/MouseDodgingSpan/MouseDodgingSpan';
import { generateUniqueId } from '../../../utility/utility';

export default function PaintingDiagonal() {
	const { getPromiseList } = useContext(AffirmationContext);
	const promiseList = getPromiseList();

    const repeatedPromiseList = Array(10).fill(promiseList).flat();
	return (
  <div className="relative h-[95vh] w-[95vw] overflow-hidden rounded-sm">
    <div className="absolute left-[-150%] top-[-150%] flex h-[400vh] w-[400vw] rotate-[-20deg] items-center justify-center flex-col">
      {repeatedPromiseList.map((promiseObj, i) => (
        <RowContainerAutoScroll key={generateUniqueId()} isFastOnHover>
          {promiseObj.text.repeat(100).split('').map((char: string, j:number) => (
            <MouseDodgingSpan text={char} key={j} className="text-10 pb-3 font-semibold" />

						))}
        </RowContainerAutoScroll>
				))}
    </div>
  </div>
	);
}
