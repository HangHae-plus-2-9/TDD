import { ROLE_TYPE, TOKEN_TYPE } from '@/common/resources';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenPayload {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  type: TOKEN_TYPE;

  @ApiProperty()
  role: ROLE_TYPE;
}
