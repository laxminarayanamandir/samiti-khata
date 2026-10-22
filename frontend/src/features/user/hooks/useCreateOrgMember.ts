import { toast } from "sonner";
import type { AxiosError } from "axios";
import { MODULES } from "@/constants/constants";
import type { UseFormReset } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
import { createOrgMember } from "../api/orgMember.api";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import type { OrgMemberSchema } from "../schemas/orgMember.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  setDialogClose?: Dispatch<SetStateAction<boolean>>;
  resetForm?: UseFormReset<OrgMemberSchema>;
};

export default function useCreateOrgMember({
  setDialogClose,
  resetForm,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrgMember,
    mutationKey: [MUTATION_KEYS.CREATE, MUTATION_KEYS.ORG_MEMBER],
    onSuccess: () => {
      toast.success("Member created successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.ORG_MEMBERS],
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

  const onCreate = (data: OrgMemberSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
