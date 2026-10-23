import { toast } from "sonner";
import { isAxiosError } from "axios";
import { login } from "../api/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MUTATION_KEYS } from "@/constants/mutationKeys";
import type { LoginSchema } from "../schemas/login.schema";
import { QUERY_KEYS } from "@/constants/queryKeys";

export default function useLoginMutation() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successful.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH_USER],
      });
      setTimeout(() => {
        navigate({ to: "/dashboard", replace: true });
      }, 300);
    },
    onError: (error) => {
      let description = "Something went wrong!";

      if (isAxiosError(error)) {
        description = error.response?.data.message;
      }

      toast.error(description);
    },
  });

  const doLogin = (data: LoginSchema) => {
    mutate(data);
  };

  return {
    isPending,
    doLogin,
  };
}
