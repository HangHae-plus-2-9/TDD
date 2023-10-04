import { AuthService } from '@/modules/auth/auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { messages } from '../resources';

// `AuthGuard`는 요청이 허용되어야 하는지를 결정하는 가드입니다.
@Injectable()
export class AuthGuard implements CanActivate {
  // `authService`는 JWT 토큰의 유효성을 검사하는데 사용됩니다.
  constructor(private authService: AuthService) {}

  // `canActivate` 메소드는 가드가 요청을 허용해야하는지를 결정합니다.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // `getRequest` 메소드로 HTTP 요청 객체를 가져옵니다.
    const request = context.switchToHttp().getRequest();
    // `validateRequest` 메소드를 호출하여 요청의 유효성을 검사합니다.
    return await this.validateRequest(request);
  }

  // `validateRequest` 메소드는 주어진 요청의 JWT 토큰 유효성을 검사합니다.
  private async validateRequest(request: any) {
    // Authorization 헤더에서 JWT 문자열을 추출합니다.
    const jwtString = request.headers.authorization?.split('Bearer ')[1];
    // JWT 문자열이 없으면, `UnauthorizedException`을 발생시켜 요청을 거부합니다.
    if (!jwtString) {
      throw new UnauthorizedException(messages.UNAUTHORIZED_EXCEPTION);
    }

    // `verifyAccessToken` 메소드를 사용하여 JWT의 유효성을 검사하고,
    // 결과를 `tokenPayload`로 요청 객체에 저장합니다.
    request.tokenPayload = await this.authService.verifyAccessToken(jwtString);
    // JWT가 유효하면 true를 반환하여 요청을 허용합니다.
    return true;
  }
}
