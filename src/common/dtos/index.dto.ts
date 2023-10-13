import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsIn,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { getEndOfDay, getStartOfDay } from '../utils';

export class IndexDto {
  @IsOptional()
  @IsString()
  searchText?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => getStartOfDay(new Date(value)))
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => getEndOfDay(new Date(value)))
  endDate?: Date;

  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 1)
  @IsInt()
  @Min(1)
  page? = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 20)
  @IsInt()
  @Min(1)
  perPage? = 20;

  @IsOptional()
  @Transform(({ value }) => value !== '0' && value !== 'false')
  @IsBoolean()
  isDesc? = true;

  @IsOptional()
  @Transform(({ value }) => value || 'id')
  @IsIn(['id'])
  orderBy? = 'id';
}
