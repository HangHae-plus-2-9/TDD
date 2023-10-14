import { CommonColumns } from '@/common/entities/common-columns';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { Payments } from '@/modules/payments/entity/payments.entity';

@Entity('orders')
export class OrderEntity extends CommonColumns {
  @Column()
  customer_id: number;

  @Column()
  payment_method: string;

  @Column()
  amount: number;

  @Column()
  paid_at?: Date;

  @Column({ nullable: true })
  canceled_at?: Date;

  @Column()
  courier_name?: string;

  @Column()
  is_prepaid: boolean;

  @Column()
  invoice_number?: string;

  @Column()
  shipping_address: string;

  @Column()
  shipping_receiver: string;

  @Column()
  shipping_receiver_phone: string;

  @Column()
  shipping_fee: number;

  @Column()
  departed_at?: Date;

  @Column()
  arrived_at?: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order_id)
  order_items: OrderItemEntity[];

  @OneToOne(() => Payments, (payment) => payment.order)
  @JoinColumn()
  payment: Payments;
}
