import { createUser } from "../api/user.api";
import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { UserSchema } from "../schemas/user.schema";

export default function useCreateUser() {
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    mutationKey: [ACTIONS.CREATE, MODULES.USER],
    onSuccess: () => {
      toast.add({
        title: "User created successfully.",
      });
    },
  });

  const onCreate = (data: UserSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
