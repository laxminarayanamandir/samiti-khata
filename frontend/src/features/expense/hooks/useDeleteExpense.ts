import { toast } from "sonner";
import { deleteExpense } from "../api/expense.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useDeleteExpense({ onSettled, onSuccess }: Props) {
  const toastId = useRef<string | number>(undefined);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MODULES.EXPENSE, ACTIONS.DELETE],
    mutationFn: deleteExpense,
    onMutate: () => {
      toastId.current = toast.loading("Deleting expense", {
        className: "bg-destructive text-destructive-foreground",
      });
    },
    onSuccess: () => {
      toast.dismiss(toastId.current);
      toast.success("Expense deleted successfully.");
      queryClient.invalidateQueries({ queryKey: [MODULES.EXPENSE] });
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
}
