import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createOrganization } from "../api/organizations.api";
import type { OrganizationSchema } from "../schemas/organization.schema";

export default function useCreateOrganization() {
  const { mutate, isPending } = useMutation({
    mutationFn: createOrganization,
    mutationKey: [ACTIONS.CREATE, MODULES.ORGANIZATION],
    onSuccess: () => {
      toast.success("Organization created successfully.");
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
