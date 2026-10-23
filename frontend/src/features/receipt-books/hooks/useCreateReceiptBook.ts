import { toast } from "sonner";
import type { AxiosError } from "axios";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createReceiptBook } from "../api/receipt-books.api";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReceiptBookSchema } from "../schemas/receipt-books.schema";

export default function useCreateReceiptBook() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createReceiptBook,
    mutationKey: [ACTIONS.CREATE, MODULES.RECEIPT_BOOK],
    onSuccess: () => {
      toast.success("Receipt Book created successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.RECEIPT_BOOK],
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data.message;
      toast.error(message);
    },
  });

  const onCreate = (data: ReceiptBookSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
    isSuccess,
    isError,
  };
}
