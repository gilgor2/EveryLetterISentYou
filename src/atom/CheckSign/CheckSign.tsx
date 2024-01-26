import React from 'react';

export default function CheckSign({ className = '' }:{ className?:string }) {
	return (
  <div
    data-testid="checkSign"
    className={`material-symbols-outlined animate-appearFromBottom text-3.5 text-black ${className}`}
		>
    check_circle
  </div>
	);
}
