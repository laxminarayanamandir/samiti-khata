import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { createExpenseCategory } from "../api/expense-category.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ExpenseCategorySchema } from "../schemas/expense-category.schema";

type Props = {
  setDialogClose?: Dispatch<SetStateAction<boolean>>;
  resetForm?: UseFormReset<ExpenseCategorySchema>;
};

export default function useCreateExpenseCategory({
  setDialogClose,
  resetForm,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createExpenseCategory,
    mutationKey: [ACTIONS.CREATE, MODULES.EXPENSE_CATEGORY],
    onSuccess: () => {
      toast.success("Category created successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.EXPENSE_CATEGORY],
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data.message;
      toast.error(message);
    },

    onSettled: () => {
      if (setDialogClose) setDialogClose(false);
      if (resetForm) resetForm();
    },
  });

  const onCreate = (data: ExpenseCategorySchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
