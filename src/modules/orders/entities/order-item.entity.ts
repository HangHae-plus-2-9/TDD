import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity extends CommonColumns {
  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.order_items)
  order: OrderEntity;
}
