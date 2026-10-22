import axiosInstance from "@/lib/axios";
import type { ExpenseCategory } from "../types/expense-category.types";
import type {
  ExpenseCategorySchema,
  UpdateExpenseCategorySchema,
} from "../schemas/expense-category.schema";
import type { ModifyReasonSchema } from "@/schema/reason.schema";

export async function createExpenseCategory(data: ExpenseCategorySchema) {
  const response = await axiosInstance.post(`/category`, data);
  return response.data.data;
}

export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  const response = await axiosInstance.get(`/category`);
  return response.data.data;
}

export async function getExpenseCategoryDetails(
  id: number | null,
): Promise<ExpenseCategory> {
  const response = await axiosInstance.get(`/category/${id}`);
  return response.data.data;
}

export async function updateExpenseCategory(data: UpdateExpenseCategorySchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(`/category/${id}`, payload);
  return response.data.data;
}

export async function deleteExpenseCategory(data: ModifyReasonSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(`/category/${id}`, payload);
  return response.data;
}
