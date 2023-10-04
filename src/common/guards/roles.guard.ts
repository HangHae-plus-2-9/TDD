import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { ROLE_TYPE } from '../resources';
import { UserEntity } from '@/modules/users/entities/user.entity';

// `RolesGuard`는 사용자의 역할을 기반으로 요청을 허용할지 말지 결정하는 가드입니다.
@Injectable()
export class RolesGuard implements CanActivate {
  // `reflector`는 메타데이터를 검사하고 사용하는 데 사용됩니다.
  constructor(private readonly reflector: Reflector) {}

  // `canActivate` 메소드는 요청이 허용되어야 하는지를 결정합니다.
  canActivate(context: ExecutionContext): boolean {
    // `reflector`를 사용하여 현재 요청 핸들러(예: 라우터 핸들러)에서 'roles' 메타데이터를 가져옵니다.
    const roles = this.reflector.get<ROLE_TYPE[]>(
      'roles',
      context.getHandler(),
    );

    // 'roles' 메타데이터가 비어있다면, 누구나 요청을 수행할 수 있습니다.
    if (_.isEmpty(roles)) {
      return true;
    }

    // `getRequest` 메소드로 HTTP 요청 객체를 가져옵니다.
    const request = context.switchToHttp().getRequest();
    // 요청 객체에서 사용자 객체를 가져옵니다.
    const user = <UserEntity>request.user;

    // TODO: 주석에서 설명한 것처럼, 이 부분은 현재 사용자의 역할과 필요한 역할을 비교하는 로직이 필요합니다.
    // 예제 코드는 항상 ADMIN 역할이 필요하다고 반환하고 있습니다.
    return roles.includes(ROLE_TYPE.ADMIN);
  }
}
