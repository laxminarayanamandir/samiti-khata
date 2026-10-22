import ExpensePage from "@/features/expense/pages/Expense-Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/expense/")({
  component: ExpensePage,
});
