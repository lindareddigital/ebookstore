import React, { RefObject } from 'react';


export default function InnerHTML({ text, className, elRef, ...props }) {
  return (
    <div
      ref={elRef}
      className={`raw-html ${className ? className : ''}`}
      dangerouslySetInnerHTML={{ __html: text }}
      {...props}
    />
  );
}
