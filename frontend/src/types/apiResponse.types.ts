export type APIErrorResponse = {
  code: string;
  message: string;
  success: boolean;
};

type PageBasedMeta = {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
};

type CursorBasedMeta = {
  nextCursor: number | null;
  hasNextPage: boolean;
};

export type APIResponsePaginated<T> = {
  success: boolean;
  message: string;
  data: T;
  meta: PageBasedMeta;
};

export type APIResponseCursorPaginated<T> = Omit<
  APIResponsePaginated<T>,
  "meta"
> & {
  meta: CursorBasedMeta;
};
