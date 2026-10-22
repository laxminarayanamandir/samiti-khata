import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { createSubCommittee } from "../api/committee.api";
import type {
  SubCommitteeForm,
  SubCommitteePayload,
} from "../schemas/committee.schema";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { ACTIONS, MODULES } from "@/constants/constants";

type Props = {
  setDialogClose?: Dispatch<SetStateAction<boolean>>;
  resetForm?: UseFormReset<SubCommitteeForm>;
};

export default function useCreateSubCommittee({
  setDialogClose,
  resetForm,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createSubCommittee,
    mutationKey: [ACTIONS.CREATE, MODULES.SUB_COMMITTEE],
    onSuccess: () => {
      toast.success("Sub-Committee created successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.SUB_COMMITTEE],
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

  const onCreate = (data: SubCommitteePayload) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
