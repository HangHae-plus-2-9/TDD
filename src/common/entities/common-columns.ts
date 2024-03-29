import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonColumns extends BaseEntity {
  @ApiProperty({ description: 'id', example: 1 })
  @PrimaryColumn('uuid')
  @Generated('uuid')
  public id!: string;

  @CreateDateColumn()
  public readonly created_at!: Date | string;

  @UpdateDateColumn()
  public readonly updated_at!: Date | string;

  @DeleteDateColumn()
  public readonly deleted_at?: Date | string | null;
}
