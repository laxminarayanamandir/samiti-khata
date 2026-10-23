import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { UseFormReset } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createFiscalYear } from "../api/fiscal-year.api";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FiscalYearInputSchema, FiscalYearSchema } from "../schemas/fiscal-year.schema";

type Props = {
  setDialogClose?: Dispatch<SetStateAction<boolean>>;
  resetForm?: UseFormReset<FiscalYearInputSchema>;
};

export default function useCreateFiscalYear({
  resetForm,
  setDialogClose,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createFiscalYear,
    mutationKey: [ACTIONS.CREATE, MODULES.FISCAL_YEAR],
    onSuccess: () => {
      toast.success("Fiscal Year created successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.FISCAL_YEAR],
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

  const onCreate = (data: FiscalYearSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
