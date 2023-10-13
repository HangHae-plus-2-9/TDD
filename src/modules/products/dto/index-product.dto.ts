import { IndexDto } from '@/common/dtos/index.dto';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class IndexProductDto extends IndexDto {
  @IsOptional()
  @Transform(({ value }) => value || 'id')
  @IsIn([
    'id',
    'seller_id',
    'name',
    'category_name',
    'description',
    'price',
    'stock',
  ])
  orderBy? = 'id';
}
