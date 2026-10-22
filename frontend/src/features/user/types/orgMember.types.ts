import type { ID, Timestamp } from "@/types/model.types";
import type { OrgMemberSchema } from "../schemas/orgMember.schema";

export type OrgMember = OrgMemberSchema &
  ID &
  Timestamp & {
    organizationId: number;
  };
