import type {
  CommitteeSchema,
  SubCommitteePayload,
  UpdateCommitteeSchema,
} from "../schemas/committee.schema";
import axiosInstance from "@/lib/axios";
import type { Committee, SubCommittee } from "../types/Committee.types";
import type { ModifyReasonSchema } from "@/schema/reason.schema";

export async function createCommittee(data: CommitteeSchema) {
  const response = await axiosInstance.post(`/committee`, data);
  return response.data.data;
}

export async function createSubCommittee(
  data: SubCommitteePayload,
): Promise<SubCommittee> {
  const response = await axiosInstance.post(`/sub-committee`, data);
  return response.data.data;
}
export async function getCommitteeDetails(
  id: number | null,
): Promise<Committee> {
  const response = await axiosInstance.get(`/committee/${id}`);
  return response.data.data;
}

export async function getSubCommitteeDetails(
  id: number | null,
): Promise<SubCommittee> {
  const response = await axiosInstance.get(`/sub-committee/${id}`);
  return response.data.data;
}

export async function getCommittees(): Promise<Committee[]> {
  const response = await axiosInstance.get(`/committee/organization`);
  return response.data.data;
}

export async function getAllSubCommittees(): Promise<SubCommittee[]> {
  const response = await axiosInstance.get(`/sub-committee`);
  return response.data.data;
}

export async function getSubCommitteesByCommittee(
  committeeId?: number,
): Promise<SubCommittee[]> {
  const response = await axiosInstance.get(
    `/sub-committee/committee/${committeeId}`,
  );
  return response.data.data;
}

export async function updateCommittee(data: UpdateCommitteeSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(`/committee/${id}`, payload);
  return response.data.data;
}

export async function updateSubCommittee(data: UpdateCommitteeSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(`/sub-committee/${id}`, payload);
  return response.data.data;
}

export async function deleteCommittee(data: ModifyReasonSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(`/committee/${id}`, payload);
  return response.data;
}

export async function deleteSubCommittee(data: ModifyReasonSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(`/sub-committee/${id}`, payload);
  return response.data;
}
