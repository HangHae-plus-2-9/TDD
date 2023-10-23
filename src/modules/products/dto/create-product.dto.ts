import { IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  sellerId: string;

  @IsString()
  name: string;

  @IsString()
  catName: string;

  @IsString()
  desc: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  stock: number;
}
