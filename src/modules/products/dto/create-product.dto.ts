import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  sellerId: number;

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
