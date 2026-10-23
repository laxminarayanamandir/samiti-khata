import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import useGetReceiptBooksInfiniteQuery from "../hooks/useGetReceiptBooksInfiniteScroll";

type Props = {
  receiptBookId: string | null;
  setReceiptBookId: Dispatch<SetStateAction<string | null>>;
};

export default function SelectReceiptBookFilter({
  receiptBookId,
  setReceiptBookId,
}: Props) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetReceiptBooksInfiniteQuery({ limit: 25 });

  const options = data?.pages.flatMap((page) => page.data) ?? [];

  const getSelectedItem = (value: string) => {
    return options.find((option) => String(option.id) === value);
  };

  return (
    <Select
      value={receiptBookId}
      onValueChange={(value) => setReceiptBookId(value)}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a receipt book">
          {receiptBookId && (
            <span>
              Receipt Book {getSelectedItem(String(receiptBookId))?.bookNumber}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Receipt Books</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              Receipt Book {option.bookNumber}
            </SelectItem>
          ))}
        </SelectGroup>
        {hasNextPage && (
          <div className="border-t p-1">
            <Button
              type="button"
              disabled={isFetchingNextPage}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                fetchNextPage();
              }}
            >
              {isFetchingNextPage && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {isFetchingNextPage ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
