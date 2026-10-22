import DashboardLayout from "@/components/shared/layout/DashboardLayout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
  beforeLoad: ({ context: { auth } }) => {
    console.log({ auth });
    if (!auth?.user && !auth.isPending) {
      toast.error("Please login to continue.");
      throw redirect({
        to: "/login",
      });
    }
  },
});