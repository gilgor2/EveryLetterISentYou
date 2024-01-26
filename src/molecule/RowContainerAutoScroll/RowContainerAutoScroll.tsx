import React, { ReactElement } from 'react';

export default function RowContainerAutoScroll({
	isFastOnHover = true,
	children,
}: {
	isFastOnHover?: boolean;
	children: ReactElement;
}) {
	return (
  <div className="group h-max w-[100%] overflowx-hidden ">
    <div
      className={`animate-moveToRightPaused ${
					isFastOnHover && 'group-hover:[animation-play-state:running]'
				}`}
    >
      <div className="animate-moveToRightInfinite flex">{children}</div>
    </div>
  </div>
	);
}
