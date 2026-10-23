import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function PageLayout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col gap-1 overflow-hidden">
      {children}
    </div>
  );
}
