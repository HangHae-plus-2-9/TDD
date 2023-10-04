// `PaginatedResult`는 페이징된 결과를 나타내는 인터페이스입니다.
export interface PaginatedResult<T> {
  // `total`은 반환된 데이터의 총 개수를 나타냅니다.
  total: number;

  // `data`는 특정 타입 `T`의 배열로, 실제 반환된 데이터 항목들을 담고 있습니다.
  data: T[];
}
