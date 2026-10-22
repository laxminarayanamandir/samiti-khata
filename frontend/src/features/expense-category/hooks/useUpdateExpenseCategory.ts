import { toast } from "sonner";
import type { AxiosError } from "axios";
import { updateExpenseCategory } from "../api/expense-category.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateExpenseCategorySchema } from "../schemas/expense-category.schema";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useUpdateExpenseCategory({
  onSettled,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateExpenseCategory,
    mutationKey: [ACTIONS.UPDATE, MODULES.EXPENSE_CATEGORY],
    onSuccess: () => {
      toast.success("Expense category updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.EXPENSE_CATEGORY],
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

  const onUpdate = (data: UpdateExpenseCategorySchema) => {
    mutate(data);
  };

  return {
    onUpdate,
    isPending,
    isSuccess,
    isError,
  };
}
