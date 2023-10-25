export interface PaginatedResult<T> {
  total: number;
  page: number;
  perPage: number;
  data: T[];
}
