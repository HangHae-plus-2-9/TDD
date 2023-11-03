import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity extends CommonColumns {
  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
