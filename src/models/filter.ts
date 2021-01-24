import { Pagination } from './pagination';

export interface By {
  [key: string]: string;
}

export interface Filter {
  pagination: Pagination;
}
