import { toast } from "sonner";
import type { AxiosError } from "axios";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "../api/expense.api";
import type { UpdateExpensePayload } from "../schemas/expense.schema";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useUpdateExpense({ onSettled, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateExpense,
    mutationKey: [ACTIONS.UPDATE, MODULES.EXPENSE],
    onSuccess: () => {
      toast.success("Expense Bill updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.EXPENSE],
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

  const onUpdate = (data: UpdateExpensePayload) => {
    mutate(data);
  };

  return {
    onUpdate,
    isPending,
    isSuccess,
    isError,
  };
}
