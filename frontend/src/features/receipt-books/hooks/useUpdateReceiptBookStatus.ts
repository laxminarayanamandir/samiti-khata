import { toast } from "sonner";
import type { AxiosError } from "axios";
import { ACTIONS, MODULES } from "@/constants/constants";
import { updateBookStatus } from "../api/receipt-books.api";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBookStatusSchema } from "../schemas/update-status.schema";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useUpdateReceiptBookStatus({ onSettled, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateBookStatus,
    mutationKey: [ACTIONS.UPDATE, MODULES.RECEIPT_BOOK, "status"],
    onSuccess: () => {
      toast.success("Receipt Book Status updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.RECEIPT_BOOK],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data.message;
      toast.error(message);
    },

    onSettled: () => {
      onSettled?.();
    },
  });

  const onUpdate = (data: UpdateBookStatusSchema) => {
    mutate(data);
  };

  return {
    onUpdate,
    isPending,
    isSuccess,
    isError,
  };
}
