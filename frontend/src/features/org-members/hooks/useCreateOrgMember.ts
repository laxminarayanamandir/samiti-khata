import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createOrgMember } from "../api/org-member.api";
import type { OrgMemberSchema } from "../schemas/org-members.schema";

export default function useCreateOrgMember() {
  const { mutate, isPending } = useMutation({
    mutationFn: createOrgMember,
    mutationKey: [ACTIONS.CREATE, MODULES.ORG_MEMBERS],
    onSuccess: () => {
      toast.add({
        title: "Member created successfully.",
      });
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
