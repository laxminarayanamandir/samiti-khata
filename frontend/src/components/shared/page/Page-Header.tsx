import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function PageHeader({ children }: Props) {
  return (
    <div className="flex flex-row justify-between px-10 py-5 shrink-0">
      {children}
    </div>
  );
}
