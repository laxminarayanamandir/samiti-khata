import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "../../ui/separator";
import { ModeToggle } from "../Mode-Toggle";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-screen overflow-hidden flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="w-full flex flex-row justify-between items-center gap-2 px-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
            </div>
            <ModeToggle />
            {/* <ProfileAvatar /> */}
          </div>
        </header>
        <Separator />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
