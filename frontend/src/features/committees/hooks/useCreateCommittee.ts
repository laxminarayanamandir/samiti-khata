import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { createCommittee } from "../api/committee.api";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import type { CommitteeSchema } from "../schemas/committee.schema";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { MODULES } from "@/constants/constants";

type Props = {
  setDialogClose?: Dispatch<SetStateAction<boolean>>;
  resetForm?: UseFormReset<CommitteeSchema>;
};

export default function useCreateCommittee({
  setDialogClose,
  resetForm,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCommittee,
    mutationKey: [MUTATION_KEYS.CREATE, MUTATION_KEYS.COMMITTEE],
    onSuccess: () => {
      toast.success("Committee created successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.COMMITTEE],
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

  const onCreate = (data: CommitteeSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
