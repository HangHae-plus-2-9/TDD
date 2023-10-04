import { CustomDecorator, SetMetadata } from '@nestjs/common';

// `PUBLIC_ROUTE_KEY`: 메타데이터 키로 사용되는 상수입니다.
// 이 키는 `PublicRoute` 데코레이터에 의해 설정된 메타데이터를 찾는 데 사용됩니다.
export const PUBLIC_ROUTE_KEY = 'publicRoute';

// `PublicRoute`: 커스텀 데코레이터를 정의하는 함수입니다.
// `isPublic` 매개변수는 엔드포인트가 공개적으로 접근 가능한지를 지정합니다.
export const PublicRoute = (isPublic = false): CustomDecorator =>
  // `SetMetadata`: `PUBLIC_ROUTE_KEY` 키와 `isPublic` 값을 사용하여 메타데이터를 설정합니다.
  // 이 메타데이터는 이 데코레이터가 적용된 엔드포인트에 관한 정보를 저장합니다.
  SetMetadata(PUBLIC_ROUTE_KEY, isPublic);
