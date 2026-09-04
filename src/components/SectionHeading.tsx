import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  note?: string;
  action?: ReactNode;
  id: string;
}

export function SectionHeading({ eyebrow, title, note, action, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {note ? <p className="section-heading__note">{note}</p> : action}
    </div>
  );
}
