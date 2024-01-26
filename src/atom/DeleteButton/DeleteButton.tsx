import React from 'react';

export default function DeleteButton({
	onClick,
	className = '',
}: {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}) {
	return (
  <button
    className={`text-4 ${className}`}
    onClick={onClick}
    type="button"
    data-testid="deleteButton"
		>
    <span className="material-icons">delete</span>
  </button>
	);
}
