import { Column, Entity, OneToOne } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';

@Entity()
export class Payments extends CommonColumns {
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CreditCard,
  })
  method: PaymentMethod;

  @Column()
  amount: number;

  @OneToOne(() => OrderEntity, (order) => order.payment)
  order: OrderEntity;

  @Column({ name: 'canceled_amount', nullable: true })
  canceledAmount: number;

  @Column({ name: 'canceled_at', nullable: true })
  canceledAt: Date;
}
