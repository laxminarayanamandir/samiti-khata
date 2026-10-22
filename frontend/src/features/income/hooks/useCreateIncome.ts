import { toast } from "sonner";
import type { AxiosError } from "axios";
import { createIncome } from "../api/income.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateIncomePayload } from "../schemas/income.schema";

export default function useCreateIncome() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createIncome,
    mutationKey: [ACTIONS.CREATE, MODULES.INCOME],
    onSuccess: () => {
      toast.success("Income Receipt added successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.INCOME],
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data.message;
      toast.error(message);
    },
  });

  const onCreate = (data: CreateIncomePayload) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
    isSuccess,
    isError,
  };
}
