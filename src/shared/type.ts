export type Role = "admin" | "user"

//phân trang
export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[],
  meta: PaginationMeta,
}

//selectOption
export interface SelectOption {
  id: string,
  name: string,
}

//baseFilterParams
export interface BaseFiterParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string
}