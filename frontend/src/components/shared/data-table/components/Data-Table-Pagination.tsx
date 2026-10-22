import { Button } from "@/components/ui/button";

type Props = {
  pageIndex: number;
  pageCount: number;
  isLoading: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

export default function DataTablePagination({
  isLoading,
  nextPage,
  pageCount,
  pageIndex,
  previousPage,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {pageCount}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}
          disabled={pageIndex === 0 || isLoading}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => nextPage()}
          disabled={pageIndex >= pageCount - 1 || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
