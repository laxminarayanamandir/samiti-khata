import axiosInstance from "@/lib/axios";
import type { Income } from "../types/income.types";
import type { IncomeQueryParams } from "@/types/pagination.types";
import type {
  CreateIncomePayload,
  UpdateIncomePayload,
} from "../schemas/income.schema";
import type { APIResponsePaginated } from "@/types/apiResponse.types";
import type { ModifyReasonSchema } from "@/schema/reason.schema";

export async function createIncome(data: CreateIncomePayload) {
  const response = await axiosInstance.post(`/income`, data);
  return response.data.data;
}

export async function updateIncome(data: UpdateIncomePayload) {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(`/income/${id}`, payload);
  return response.data.data;
}

export async function getIncomes({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  searchKey = "",
  searchColumn = "",
  receiptBookId = "",
  committeeId = "",
  minAmount,
  maxAmount,
}: IncomeQueryParams): Promise<APIResponsePaginated<Income[]>> {
  const response = await axiosInstance.get("/income", {
    params: {
      pageSize,
      pageIndex,
      sortDir,
      searchKey,
      searchColumn,
      receiptBookId,
      committeeId,
      minAmount,
      maxAmount,
    },
  });
  return response.data;
}

export async function exportIncomes(
  payload: IncomeQueryParams & {
    password: string;
    scope: "all-matching" | "current-page";
  },
): Promise<Blob> {
  const response = await axiosInstance.post("/income/export", payload, {
    responseType: "blob",
  });
  return response.data;
}

export async function getIncomeDetails(
  incomeId: number | null,
): Promise<Income> {
  const response = await axiosInstance.get(`/income/${incomeId}`);
  return response.data.data;
}

export async function deleteIncome(data: ModifyReasonSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(`/income/${id}`, payload);
  return response.data;
}
