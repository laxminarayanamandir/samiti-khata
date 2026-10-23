import axiosInstance from "@/lib/axios";
import type { ReceiptBookSchema } from "../schemas/receipt-books.schema";
import type { ReceiptBook } from "../types/receiptBooks.types";
import type {
  CursorPaginatedQueryString,
  ReceiptBookQueryParams,
} from "@/types/pagination.types";
import type {
  APIResponseCursorPaginated,
  APIResponsePaginated,
} from "@/types/apiResponse.types";
import type { UpdateBookStatusSchema } from "../schemas/update-status.schema";

export async function createReceiptBook(data: ReceiptBookSchema) {
  const response = await axiosInstance.post(`/receipt-book`, data);
  return response.data.data;
}

export async function getReceiptBooks({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  fiscalYearId,
  status,
  assignedTo,
  searchKey,
  searchColumn,
}: ReceiptBookQueryParams): Promise<APIResponsePaginated<ReceiptBook[]>> {
  const response = await axiosInstance.get(
    `/receipt-book?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}&fiscalYearId=${fiscalYearId}&status=${status}&assignedTo=${assignedTo}&searchKey=${searchKey}&searchColumn=${searchColumn}`,
  );
  return response.data;
}

export async function getReceiptBooksInfiniteScroll({
  limit,
  cursor,
}: CursorPaginatedQueryString): Promise<
  APIResponseCursorPaginated<ReceiptBook[]>
> {
  console.log({ limit, cursor });
  let url = `/receipt-book/cursor?limit=${limit}`;

  if (cursor) url = url.concat(`&cursor=${cursor}`);

  const response = await axiosInstance.get(url);
  return response.data;
}

export async function getReceiptBookDetails(
  id: number | null,
): Promise<ReceiptBook> {
  const response = await axiosInstance.get(`/receipt-book/${id}`);
  return response.data.data;
}

export async function updateBookStatus(data: UpdateBookStatusSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(
    `/receipt-book/status/${id}`,
    payload,
  );
  return response.data.data;
}
