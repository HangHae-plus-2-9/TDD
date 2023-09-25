import { PaginatedResult } from '../interfaces/paginated-result.interface';

export interface BaseRepositoryInterface<T> {
  create(data: T): Promise<T>;

  createMany(data: T[]): Promise<T[]>;

  all(columns?: [], relations?: []): Promise<T[]>;

  findById(id: number, columns?: [], relations?: []): Promise<T>;

  update(id: number, data: Partial<T>): Promise<T>;

  remove(id: number): Promise<T>;

  paginate(
    page: number,
    perPage: number,
    columns: [],
    relations: [],
  ): Promise<PaginatedResult<T>>;
}
