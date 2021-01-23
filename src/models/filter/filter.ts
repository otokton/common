export interface By {
  [key: string]: string;
}
export interface Pagination {
  page: number;
  limit: number;
}

export interface Filter {
  pagination: Pagination;
}
