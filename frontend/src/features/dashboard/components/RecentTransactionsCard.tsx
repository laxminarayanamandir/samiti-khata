import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNPR } from "@/lib/formatNepaliCurrency";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type RecentTransaction = {
  id: number;
  title: string;
  detail: string;
  date: string;
  amount: number;
};

type Props = {
  title: string;
  description: string;
  href: "/income" | "/expense";
  icon: ReactNode;
  tone: "income" | "expense";
  items: RecentTransaction[];
  isLoading: boolean;
  error?: string;
  compactList?: boolean;
};

export default function RecentTransactionsCard({
  title,
  description,
  href,
  icon,
  tone,
  items,
  isLoading,
  error,
  compactList = false,
}: Props) {
  const amountClass =
    tone === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400";

  return (
    <Card className="min-w-0">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
                tone === "income"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }`}
            >
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={<Link to={href} />}
            className="shrink-0"
          >
            View all
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="gap-0">
        {isLoading ? (
          <div className="space-y-4 py-1" aria-label={`Loading ${title}`}>
            {Array.from({ length: 5 }, (_, index) => (
              <div className="flex items-center justify-between gap-4" key={index}>
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="py-8 text-center text-sm text-destructive">
            Could not load {title.toLowerCase()}: {error}
          </p>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No records yet.
          </p>
        ) : (
          <ul
            className={`${
              compactList ? "max-h-80" : "max-h-136"
            } divide-y overflow-y-auto`}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-3 first:pt-1 last:pb-1"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {item.detail} <span aria-hidden="true">·</span> {item.date}
                  </p>
                </div>
                <p className={`shrink-0 text-sm font-semibold ${amountClass}`}>
                  {formatNPR(item.amount)} /-
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
