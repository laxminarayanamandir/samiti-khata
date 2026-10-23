import { toast } from "sonner";
import { deleteExpenseCategory } from "../api/expense-category.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useDeleteExpenseCategory({
  onSettled,
  onSuccess,
}: Props) {
  const toastId = useRef<string | number>(undefined);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MODULES.EXPENSE_CATEGORY, ACTIONS.DELETE],
    mutationFn: deleteExpenseCategory,
    onMutate: () => {
      toastId.current = toast.loading("Deleting expense category", {
        className: "bg-destructive text-destructive-foreground",
      });
    },
    onSuccess: () => {
      toast.dismiss(toastId.current);
      toast.success("Expense category deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.EXPENSE_CATEGORY],
      });
      onSuccess?.();
    },
    onError: () => {
      toast.dismiss(toastId.current);
      toast.error("Something went wrong.");
    },
    onSettled: () => {
      onSettled?.();
    },
  });

  return mutation;
}
