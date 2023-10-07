import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity extends CommonColumns {
  @Column({ nullable: true })
  canceled_at?: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.orderId)
  order_items: OrderItemEntity[];
}
