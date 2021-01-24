export interface Pagination {
  page: number;
  limit: number;
}

export function paginationToUri(pagination: Pagination) {
  return `?page=${pagination.page}&limit=${pagination.limit}`;
}
