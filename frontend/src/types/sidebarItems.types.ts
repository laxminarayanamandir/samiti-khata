import type { Role } from "@/constants/roles";
import type { LucideIcon } from "lucide-react";

export type SidebarItems = {
  title: string;
  url: string;
  items: {
    icon: LucideIcon;
    title: string;
    url: string;
    allowedRoles: Role[];
  }[];
};
