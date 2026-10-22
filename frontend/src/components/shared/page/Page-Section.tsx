import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageSection({ children }: Props) {
  return <div className="px-10">{children}</div>;
}
