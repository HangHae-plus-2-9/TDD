import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../guards';
import { ROLE_TYPE } from '../resources';
import { PublicRoute } from './public-route.decorator';

// `Auth`는 데코레이터 팩토리 함수이며,
// 이는 특정 역할(role)과 함께 인증 및 인가 메타데이터를 설정하는 커스텀 데코레이터입니다.
export function Auth(
  // `roles`: 엔드포인트에 접근할 수 있는 역할의 배열입니다.
  // 기본값은 빈 배열이며, 이는 특정 역할 없이도 엔드포인트에 접근할 수 있음을 의미합니다.
  roles: ROLE_TYPE[] = [],
  // `options`: 이 객체는 데코레이터의 추가적인 설정을 위한 옵션입니다.
  // 현재는 `public` 프로퍼티만을 가질 수 있습니다.
  options?: { public: boolean },
): MethodDecorator {
  // `isPublicRoute`: 옵션에서 제공된 `public` 값이나 기본적으로 `false`를 사용합니다.
  const isPublicRoute = options?.public ?? false;

  // `applyDecorators`: 다수의 데코레이터를 하나로 묶어 적용합니다.
  return applyDecorators(
    // `SetMetadata`: `roles` 메타데이터를 설정하여 후속 `RolesGuard`에서 사용될 수 있게 합니다.
    SetMetadata('roles', roles),
    // `UseGuards`: `AuthGuard`와 `RolesGuard`를 적용하여
    // 이 데코레이터가 사용되는 엔드포인트에 인증과 역할 기반 인가를 적용합니다.
    UseGuards(AuthGuard, RolesGuard),
    // `ApiBearerAuth`: Swagger 문서에 이 엔드포인트가 Bearer 토큰을 사용하는 것을 표시합니다.
    ApiBearerAuth(),
    // `ApiUnauthorizedResponse`: Swagger 문서에 401 Unauthorized 응답에 대한 설명을 제공합니다.
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    // `PublicRoute`: 만약 `isPublicRoute`가 `true`로 설정되어 있다면,
    // 이 엔드포인트를 공개 라우트로 표시합니다.
    PublicRoute(isPublicRoute),
  );
}
