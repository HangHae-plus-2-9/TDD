import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity extends CommonColumns {
  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.order_items)
  order: OrderEntity;
}