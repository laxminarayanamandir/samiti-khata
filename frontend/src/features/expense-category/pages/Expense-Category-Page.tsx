import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import { ClientDataTable } from "@/components/shared/data-table";
import useGetExpenseCategories from "../hooks/useGetExpenseCategories";
import CreateExpenseCategoryDialog from "../components/Create-Expense-Category-Dialog";
import { expenseCategoryDataTableColumns } from "../components/Expense-Category-Columns";

export default function ExpenseCategoryPage() {
  const { data, isPending } = useGetExpenseCategories();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Expense Category"
          description="Manage expense categories."
        />
        <CreateExpenseCategoryDialog />
      </PageHeader>
      <PageSection>
        <ClientDataTable
          columns={expenseCategoryDataTableColumns}
          data={data}
          isLoading={isPending}
          searchColumn="name"
        />
      </PageSection>
    </PageLayout>
  );
}
