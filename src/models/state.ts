import { Filter } from "./filter";

export interface State<T> {
    items: T[];
    item: T;
    filter: Filter;
    count: number;
    total: number;
  }