import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/contexts/useAuth";
import useGetCommittees from "@/features/committees/hooks/useGetCommittees";
import useGetExpenses from "@/features/expense/hooks/useGetExpenses";
import useGetIncomes from "@/features/income/hooks/useGetIncomes";
import useGetMyOrganization from "@/features/organizations/hooks/useGetMyOrganization";
import getNepaliDate from "@/lib/getNepaliDate";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import RecentCommitteesCard from "../components/RecentCommitteesCard";
import RecentTransactionsCard from "../components/RecentTransactionsCard";

const RECENT_ROW_COUNT = 20;
const SHARED_PAGE_SIZE = 25;

function getErrorMessage(error: Error | null) {
  return error?.message ?? "Please try again.";
}

export default function DashboardPage() {
  const { user, isPending: isUserPending } = useAuth();
  const organization = useGetMyOrganization();
  const committees = useGetCommittees();

  // Match the list pages' initial parameters so React Query can reuse their cache.
  const incomes = useGetIncomes({
    pageIndex: 1,
    pageSize: SHARED_PAGE_SIZE,
    sortDir: "desc",
    searchKey: "",
    searchColumn: "",
    receiptBookId: "",
    committeeId: "",
  });
  const expenses = useGetExpenses({
    pageIndex: 1,
    pageSize: SHARED_PAGE_SIZE,
    sortDir: "desc",
    searchKey: "",
    searchColumn: "",
    categoryId: "",
    committeeId: "",
  });

  const today = new Date();
  const adDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(today);
  const bsDate = getNepaliDate(today.toISOString());

  const recentCommittees = [...(committees.data ?? [])]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="space-y-2 text-center">
          {organization.isPending ? (
            <Skeleton className="h-7 w-64 max-w-full" />
          ) : organization.isError ? (
            <p className="text-sm text-destructive">
              Could not load organization:{" "}
              {getErrorMessage(organization.error)}
            </p>
          ) : (
            <h1 className="wrap-break-word text-3xl font-bold tracking-tight">
              {organization.data?.name ?? "Organization"}
            </h1>
          )}
          {organization.data?.address && (
            <p className="text-sm text-muted-foreground">
              {organization.data.address}
            </p>
          )}
          <p className="text-xl text-muted-foreground text-left">
            Good to see you,{" "}
            {isUserPending ? (
              <span className="inline-block h-4 w-24 animate-pulse rounded bg-muted align-middle" />
            ) : (
              <span className="font-medium text-foreground">
                {user?.name ?? "User"}
              </span>
            )}
          </p>
        </header>

        <section
          className="grid w-full min-w-0 gap-6"
          style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        >
          <RecentTransactionsCard
            title="Recent income"
            description="The latest income receipts."
            href="/income"
            icon={<ArrowDownLeft aria-hidden="true" />}
            tone="income"
            isLoading={incomes.isPending}
            error={
              incomes.isError ? getErrorMessage(incomes.error) : undefined
            }
            items={(incomes.data?.data ?? [])
              .slice(0, RECENT_ROW_COUNT)
              .map((income) => ({
                id: income.id,
                title: income.name,
                detail: `Receipt #${income.receiptNumber}`,
                date: income.nepaliDate,
                amount: income.amount,
              }))}
          />
          <Card className="min-w-0 justify-center">
            <CardContent className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <CalendarDays className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Today
                </p>
                <p className="mt-1 wrap-break-word text-sm font-medium">{bsDate} BS</p>
                <p className="mt-0.5 wrap-break-word text-xs text-muted-foreground">
                  {adDate} AD
                </p>
              </div>
            </CardContent>
          </Card>
          <RecentTransactionsCard
            title="Recent expenses"
            description="The latest expense bills."
            href="/expense"
            icon={<ArrowUpRight aria-hidden="true" />}
            tone="expense"
            isLoading={expenses.isPending}
            error={
              expenses.isError ? getErrorMessage(expenses.error) : undefined
            }
            items={(expenses.data?.data ?? [])
              .slice(0, RECENT_ROW_COUNT)
              .map((expense) => ({
                id: expense.id,
                title: expense.particulars,
                detail: expense.Category.name,
                date: expense.nepaliDate,
                amount: expense.amount,
              }))}
          />
          <RecentCommitteesCard
            committees={recentCommittees}
            isLoading={committees.isPending}
            error={
              committees.isError ? getErrorMessage(committees.error) : undefined
            }
          />
        </section>
      </div>
    </main>
  );
}
