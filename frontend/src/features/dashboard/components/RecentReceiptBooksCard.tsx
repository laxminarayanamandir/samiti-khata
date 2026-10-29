import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReceiptBook } from "@/features/receipt-books/types/receiptBooks.types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

type Props = {
  receiptBooks: ReceiptBook[];
  isLoading: boolean;
  error?: string;
};

export default function RecentReceiptBooksCard({
  receiptBooks,
  isLoading,
  error,
}: Props) {
  return (
    <Card className="min-w-0">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Recent receipt books</CardTitle>
            <CardDescription className="mt-1">
              The latest receipt books in your organization.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={<Link to="/receipt-books" />}
            className="shrink-0"
          >
            View all
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="gap-0">
        {isLoading ? (
          <div className="space-y-4 py-1" aria-label="Loading receipt books">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Skeleton className="size-9 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="py-8 text-center text-sm text-destructive">
            Could not load receipt books: {error}
          </p>
        ) : receiptBooks.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No receipt books yet.
          </p>
        ) : (
          <ul className="divide-y">
            {receiptBooks.map((receiptBook) => (
              <li
                key={receiptBook.id}
                className="flex items-center gap-3 py-3 first:pt-1 last:pb-1"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <BookOpen className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    Book #{receiptBook.bookNumber}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    Receipts {receiptBook.receiptStartingNumber}–
                    {receiptBook.receiptEndingNumber} ·{" "}
                    {receiptBook.committee.name}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  {receiptBook.status.replaceAll("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
