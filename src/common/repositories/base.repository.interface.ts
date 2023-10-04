// 'PaginatedResult' 인터페이스를 가져옵니다.
import { PaginatedResult } from '../interfaces/paginated-result.interface';

// 'T'를 타입 파라미터로 가지는 'BaseRepositoryInterface' 인터페이스를 정의합니다.
export interface BaseRepositoryInterface<T> {
  // 전달된 'data'를 사용하여 T 타입의 인스턴스를 생성하고, Promise로 해당 인스턴스를 반환합니다.
  create(data: T): Promise<T>;

  // 전달된 T 타입의 'data' 배열을 사용하여 여러 인스턴스를 생성하고, Promise로 인스턴스 배열을 반환합니다.
  createMany(data: T[]): Promise<T[]>;

  // 모든 T 타입의 인스턴스를 Promise로 반환합니다. 선택적으로 특정 'columns'과 'relations'을 제공할 수 있습니다.
  all(columns?: [], relations?: []): Promise<T[]>;

  // 주어진 'id'에 해당하는 T 타입의 인스턴스를 찾아 Promise로 반환합니다. 선택적으로 'columns'과 'relations'을 지정할 수 있습니다.
  findById(id: number, columns?: [], relations?: []): Promise<T>;

  // 주어진 'id'에 해당하는 인스턴스를 찾아 'data'로 업데이트하고, Promise로 업데이트된 인스턴스를 반환합니다.
  update(id: number, data: Partial<T>): Promise<T>;

  // 주어진 'id'에 해당하는 인스턴스를 제거하고, Promise로 제거된 인스턴스를 반환합니다.
  remove(id: number): Promise<T>;

  // 지정된 'page'와 'perPage'에 따라 데이터를 페이지네이션하고, 'columns'과 'relations'을 선택적으로 받아,
  // 'PaginatedResult<T>' 타입의 결과를 Promise로 반환합니다.
  paginate(
    page: number,
    perPage: number,
    columns: [],
    relations: [],
  ): Promise<PaginatedResult<T>>;
}
