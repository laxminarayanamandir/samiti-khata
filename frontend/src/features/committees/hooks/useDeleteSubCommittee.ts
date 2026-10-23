import { toast } from "sonner";
import { deleteSubCommittee } from "../api/committee.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useDeleteSubCommittee({ onSettled, onSuccess }: Props) {
  let toastId: string | number;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MODULES.SUB_COMMITTEE, ACTIONS.DELETE],
    mutationFn: deleteSubCommittee,
    onMutate: () => {
      toastId = toast.loading("Deleting sub-committee", {
        className: "bg-destructive text-destructive-foreground",
      });
    },

    onSuccess: () => {
      toast.dismiss(toastId);
      toast.success("Sub-Committee deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.SUB_COMMITTEE],
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
