import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  sellerId: number; // 사용자는 판매자의 ID만 제공합니다. 연관된 엔터티는 서비스 레벨에서 처리됩니다.
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsOptional() // 선택적 필드입니다.
  description?: string;
}