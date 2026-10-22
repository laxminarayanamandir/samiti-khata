import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createOrganization } from "../api/organizations.api";
import type { OrganizationSchema } from "../schemas/organization.schema";

export default function useCreateOrganization() {
  const { mutate, isPending } = useMutation({
    mutationFn: createOrganization,
    mutationKey: [ACTIONS.CREATE, MODULES.ORGANIZATION],
    onSuccess: () => {
      toast.add({
        title: "Organization created successfully.",
      });
    },
  });

  const onCreate = (data: OrganizationSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
