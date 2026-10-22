import { toast } from "sonner";
import type { AxiosError } from "axios";
import { updateSubCommittee } from "../api/committee.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCommitteeSchema } from "../schemas/committee.schema";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useUpdateSubCommittee({ onSettled, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateSubCommittee,
    mutationKey: [ACTIONS.UPDATE, MODULES.SUB_COMMITTEE],
    onSuccess: () => {
      toast.success("Sub-Committee updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.SUB_COMMITTEE],
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

  const onUpdate = (data: UpdateCommitteeSchema) => {
    mutate(data);
  };

  return {
    onUpdate,
    isPending,
    isSuccess,
    isError,
  };
}
