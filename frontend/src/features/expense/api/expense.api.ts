import axiosInstance from "@/lib/axios";
import type { Expense } from "../types/expense.types";
import type { ExpenseQueryParams } from "@/types/pagination.types";
import type {
  CreateExpensePayload,
  UpdateExpensePayload,
} from "../schemas/expense.schema";
import type { APIResponsePaginated } from "@/types/apiResponse.types";
import type { ModifyReasonSchema } from "@/schema/reason.schema";

export async function createExpense(data: CreateExpensePayload) {
  const response = await axiosInstance.post(`/expense`, data);
  return response.data.data;
}

export async function getExpenses({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  searchKey = "",
  searchColumn = "",
  categoryId = "",
  committeeId = "",
}: ExpenseQueryParams): Promise<APIResponsePaginated<Expense[]>> {
  const response = await axiosInstance.get(
    `/expense?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}&searchKey=${searchKey}&searchColumn=${searchColumn}&categoryId=${categoryId}&committeeId=${committeeId}`,
  );
  return response.data;
}

export async function getExpenseDetails(
  expenseId: number | null,
): Promise<Expense> {
  const response = await axiosInstance.get(`/expense/${expenseId}`);
  return response.data.data;
}

export async function deleteExpense(data: ModifyReasonSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(`/expense/${id}`, payload);
  return response.data;
}

export async function updateExpense(data: UpdateExpensePayload) {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(`/expense/${id}`, payload);
  return response.data;
}
