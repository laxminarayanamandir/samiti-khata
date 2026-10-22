import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { logout } from "../api/auth.api";

export default function useLogoutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEYS.AUTH_USER], null);
      toast.success("Logout successful.");
      navigate({ to: "/login", replace: true });
    },
    onError: (error) => {
      const description = isAxiosError(error)
        ? error.response?.data?.message || "Unable to log out."
        : "Unable to log out.";
      toast.error(description);
    },
  });

  return {
    isPending,
    doLogout: () => mutate(),
  };
}
