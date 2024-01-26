import React, { ReactElement, useState } from 'react';

type Props = {
	children?: ReactElement;
	active?: boolean;
	className?: string;
	disable?: boolean;
};
export default function UnderlineContainer({
	active = false,
	children,
	className = '',
	disable = false,
}: Props) {
	const [isUnderLine, setisUnderLine] = useState(active);

	return (
  <div
    className={`${className}w-max h-max`}
    onFocus={() => {
				setisUnderLine(true);
			}}
    onBlur={() => {
				if (!active) {
					setisUnderLine(false);
				}
			}}
		>
    {children}
    <br />
    {isUnderLine && !disable && (
    <div className="animate-expandRight border border-tg" data-testid="underline" />
			)}
  </div>
	);
}
