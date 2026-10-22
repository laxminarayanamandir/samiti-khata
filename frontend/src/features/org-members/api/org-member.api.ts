import axiosInstance from "@/lib/axios";
import type { OrgMemberSchema } from "../schemas/org-members.schema";

export async function createOrgMember(data: OrgMemberSchema) {
  const response = await axiosInstance.post(`/authorized-org-member`, data);
  return response.data.data;
}
