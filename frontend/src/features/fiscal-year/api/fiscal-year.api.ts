import axiosInstance from "@/lib/axios";
import type { FiscalYearSchema } from "../schemas/fiscal-year.schema";
import type { FiscalYear } from "../types/fiscalYear.types";

export async function createFiscalYear(data: FiscalYearSchema) {
  const response = await axiosInstance.post(`/fiscal-year`, data);
  return await response.data.data;
}

export async function getFiscalYear(): Promise<FiscalYear[]> {
  const response = await axiosInstance.get(`/fiscal-year`);
  return response.data.data;
}
