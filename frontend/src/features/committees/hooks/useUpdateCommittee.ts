import { toast } from "sonner";
import type { AxiosError } from "axios";
import { updateCommittee } from "../api/committee.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCommitteeSchema } from "../schemas/committee.schema";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useUpdateCommittee({
  onSettled,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateCommittee,
    mutationKey: [ACTIONS.UPDATE, MODULES.COMMITTEE],
    onSuccess: () => {
      toast.success("Committee updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.COMMITTEE],
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
