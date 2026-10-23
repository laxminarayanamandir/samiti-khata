import { createFileRoute } from "@tanstack/react-router";
import OrganizationPage from "@/features/organizations/pages/Organization-Page";

export const Route = createFileRoute("/_dashboard/organization/")({
  component: OrganizationPage,
});
