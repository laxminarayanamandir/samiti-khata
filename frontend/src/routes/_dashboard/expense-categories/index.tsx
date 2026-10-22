import ExpenseCategoryPage from "@/features/expense-category/pages/Expense-Category-Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/expense-categories/")({
  component: ExpenseCategoryPage,
});
