import React, { ReactNode } from 'react';

export default function ActionButon({ children, className = '', onClick = () => {} }
:{ children:ReactNode, onClick:()=>void, className?:string }) {
  return (
    <div
      className={`${className} cursor-pointer rounded-full border-2 p-1 text-2 text-tg`}
      role="button"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
