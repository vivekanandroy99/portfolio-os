import type { ReactNode } from "react";

/** The mac-style title bar used on every window. */
export function Bar({ title }: { title: string }) {
  return (
    <div className="bar">
      <div className="lights">
        <i />
        <i />
        <i />
      </div>
      <div className="title">{title}</div>
    </div>
  );
}

export function Win({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`win ${className}`}>
      <Bar title={title} />
      {children}
    </div>
  );
}
