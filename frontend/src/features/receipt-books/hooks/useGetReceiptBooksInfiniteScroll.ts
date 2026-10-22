import { MODULES } from "@/constants/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReceiptBooksInfiniteScroll } from "../api/receipt-books.api";
import type { CursorPaginatedQueryString } from "@/types/pagination.types";

export default function useGetReceiptBooksInfiniteQuery({
  limit,
}: CursorPaginatedQueryString) {
  return useInfiniteQuery({
    queryKey: [MODULES.RECEIPT_BOOK, "cursor", limit],
    queryFn: ({ pageParam }) =>
      getReceiptBooksInfiniteScroll({ limit, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
  });
}
