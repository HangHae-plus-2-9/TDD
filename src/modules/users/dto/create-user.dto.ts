import { UserEntity, UserWithoutPassword } from '../entities/user.entity';
import {
  IsNotEmpty,
  IsEnum,
  ValidateNested,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ROLE_TYPE } from '@/common/resources';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from '@/modules/customers/dto/create-customer.dto';
import { CreateSellerDto } from '@/modules/sellers/dto/create-seller.dto';
export class CreateUserDto extends UserEntity {
  // @IsNotEmpty와 같은 class-validator 데코레이터를 사용하여
  // 필수 필드를 검증합니다.
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  // 기타 UserEntity 속성도 여기에 추가될 수 있습니다.

  // 사용자 역할(관리자, 고객, 판매자)을 지정
  @IsNotEmpty()
  @IsEnum(ROLE_TYPE)
  roleType: ROLE_TYPE;

  // 고객 정보. 조건부 검증이 필요할 수 있습니다.
  // 예를 들면, roleType이 CUSTOMER일 때만 이 필드가 필요합니다.
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customerDetail?: CreateCustomerDto;

  // 판매자 정보. 조건부 검증이 필요할 수 있습니다.
  // 예를 들면, roleType이 SELLER일 때만 이 필드가 필요합니다.
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSellerDto)
  sellerDetail?: CreateSellerDto;

  // [Optional] 필요하다면, 다른 메서드들도 정의할 수 있습니다.
}
