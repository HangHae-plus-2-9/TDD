import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryColumn()
  id: number;
}
