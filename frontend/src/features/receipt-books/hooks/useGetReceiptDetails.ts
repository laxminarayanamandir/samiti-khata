import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getReceiptBookDetails } from "../api/receipt-books.api";

export default function useGetReceiptBookDetails(id: number | null) {
  return useQuery({
    queryKey: [MODULES.RECEIPT_BOOK, "details", id],
    enabled: !!id,
    queryFn: () => getReceiptBookDetails(id),
  });
}
