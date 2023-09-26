import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../guards';
import { ROLE_TYPE } from '../resources';
import { PublicRoute } from './public-route.decorator';

export function Auth(
  roles: ROLE_TYPE[] = [],
  options?: { public: boolean },
): MethodDecorator {
  const isPublicRoute = options?.public ?? false;

  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    // UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    PublicRoute(isPublicRoute),
  );
}
