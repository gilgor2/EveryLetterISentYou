import React from 'react';

type Props = {
	active?: boolean;
	onEnter: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	autoFocus?: boolean;
};
export default function EnterButton({
	active = true,
	onEnter,
	className,
	autoFocus = false,
}: Props) {
	return (
  <button
    className={`w-40 rounded-s ${active ? 'bg-tg' : 'bg-bgg'} p-0.5 text-2 text-white ${
				!active && 'cursor-none '
			} ${className}`}
    onClick={onEnter}
    type="button"
    disabled={!active}
    autoFocus={autoFocus}
		>
    Enter
  </button>
	);
}
