import { createFileRoute } from "@tanstack/react-router";
import FiscalYearPage from "@/features/fiscal-year/pages/Fiscal-Year-Page";

export const Route = createFileRoute("/_dashboard/fiscal-year/")({
  component: FiscalYearPage,
});
