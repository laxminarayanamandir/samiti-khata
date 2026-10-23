import { toast } from "sonner";
import { deleteIncome } from "../api/income.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useDeleteIncome({ onSettled, onSuccess }: Props) {
  let toastId: string | number;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MODULES.INCOME, ACTIONS.DELETE],
    mutationFn: deleteIncome,
    onMutate: () => {
      toastId = toast.loading("Deleting income", {
        className: "bg-destructive text-destructive-foreground",
      });
    },

    onSuccess: () => {
      toast.dismiss(toastId);
      toast.success("Income deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.INCOME],
      });
      onSuccess?.();
    },

    onError: () => {
      toast.dismiss(toastId);
      toast.error("Something went wrong.");
    },

    onSettled: () => {
      onSettled?.();
    },
  });

  return mutation;
}
