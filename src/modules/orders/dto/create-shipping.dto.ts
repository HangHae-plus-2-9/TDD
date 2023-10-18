import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsOptional()
  @IsString()
  courierName?: number;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsString()
  address: string;

  @IsString()
  receiver: string;

  @IsString()
  receiverPhone: string;

  @IsOptional()
  @IsDateString()
  departedAt?: Date;

  @IsOptional()
  @IsDateString()
  arrivedAt?: Date;

  @IsOptional()
  @IsDateString()
  canceledAt?: Date;
}
