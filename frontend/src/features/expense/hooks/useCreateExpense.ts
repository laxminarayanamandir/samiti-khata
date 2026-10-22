import { toast } from "sonner";
import type { AxiosError } from "axios";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../api/expense.api";
import type { CreateExpensePayload } from "../schemas/expense.schema";

export default function useCreateExpense() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createExpense,
    mutationKey: [ACTIONS.CREATE, MODULES.EXPENSE],
    onSuccess: () => {
      toast.success("Expense Bill added successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.EXPENSE],
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data.message;
      toast.error(message);
    },
  });

  const onCreate = (data: CreateExpensePayload) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
    isSuccess,
    isError,
  };
}
