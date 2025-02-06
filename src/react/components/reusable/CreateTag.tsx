// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

export default function CreateTag({
  tag,
  onClick,
}: {
  tag: string;
  onClick?: (tag: string) => void;
}) {
  return (
    <li
      className="tags"
      onClick={() => {
        onClick?.(tag);
      }}
      data-testid={`selected-tag-${tag}`}
    >
      {tag}
    </li>
  );
}
