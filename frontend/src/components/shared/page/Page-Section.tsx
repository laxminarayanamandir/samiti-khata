import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageSection({ children, className }: Props) {
  return <div className={cn("px-10", className)}>{children}</div>;
}
