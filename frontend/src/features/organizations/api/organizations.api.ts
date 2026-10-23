import axiosInstance from "@/lib/axios";
import type { OrganizationSchema } from "../schemas/organization.schema";
import type { Organization } from "../types/organization.types";

export async function createOrganization(data: OrganizationSchema) {
  const response = await axiosInstance.post(`/organization`, data);
  return response.data.data;
}

export async function getMyOrganization(): Promise<Organization> {
  const response = await axiosInstance.get(`/organization/me`);
  return response.data.data;
}
