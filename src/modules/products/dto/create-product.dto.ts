import { PickType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductEntity } from '../entities/product.entity';
import { SellerEntity } from '@/modules/users/entities/seller.entity';

export class CreateProductDto extends PickType(ProductEntity, [
  'seller',
  'name',
  'product_type',
  'category_name',
  'option',
  'description',
  'price',
  'quantity',
] as const) {
  @IsNumber()
  seller: number | SellerEntity;

  @IsString()
  name: string;

  @IsString()
  product_type: string;

  @IsString()
  category_name: string;

  @IsString()
  option: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsNumber()
  quantity: number;
}
