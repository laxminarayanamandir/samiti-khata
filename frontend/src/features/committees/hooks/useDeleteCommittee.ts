import { toast } from "sonner";
import { deleteCommittee } from "../api/committee.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useDeleteCommittee({ onSettled, onSuccess }: Props) {
  let toastId: string | number;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MODULES.COMMITTEE, ACTIONS.DELETE],
    mutationFn: deleteCommittee,
    onMutate: () => {
      toastId = toast.loading("Deleting committee", {
        className: "bg-destructive text-destructive-foreground",
      });
    },

    onSuccess: () => {
      toast.dismiss(toastId);
      toast.success("Committee deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.COMMITTEE],
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
