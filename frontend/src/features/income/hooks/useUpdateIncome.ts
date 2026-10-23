import { toast } from "sonner";
import type { AxiosError } from "axios";
import { updateIncome } from "../api/income.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateIncomePayload } from "../schemas/income.schema";

type Props = {
  onSettled?: () => void;
  onSuccess?: () => void;
};

export default function useUpdateIncome({ onSettled, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: updateIncome,
    mutationKey: [ACTIONS.UPDATE, MODULES.INCOME],
    onSuccess: () => {
      toast.success("Income Receipt updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.INCOME],
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

  const onUpdate = (data: UpdateIncomePayload) => {
    mutate(data);
  };

  return {
    onUpdate,
    isPending,
    isSuccess,
    isError,
  };
}
