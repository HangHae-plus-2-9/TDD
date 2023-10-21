import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity extends CommonColumns {
  @Column()
  customer_id: number;

  @Column()
  payment_method: number;

  @Column()
  payment_amount: number;

  @Column({ nullable: true })
  paid_at?: Date;

  @Column({ nullable: true })
  canceled_at?: Date;

  @Column({ nullable: true })
  courier_name?: number;

  @Column({ nullable: true })
  invoice_number?: string;

  @Column()
  shipping_address: string;

  @Column()
  shipping_receiver: string;

  @Column()
  shipping_receiver_phone: string;

  @Column({ nullable: true })
  departed_at?: Date;

  @Column({ nullable: true })
  arrived_at?: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  order_items: OrderItemEntity[];
}
