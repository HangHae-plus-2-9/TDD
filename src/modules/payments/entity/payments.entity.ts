import { Column, Entity, OneToOne } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { PaymentPg, PaymetMethod } from '@/modules/payments/enum/payments.enum';

@Entity()
export class Payments extends CommonColumns {
  @Column({ type: 'enum', enum: PaymentPg, default: PaymentPg.Tosspayments })
  pg: PaymentPg;

  @Column({
    type: 'enum',
    enum: PaymetMethod,
    default: PaymetMethod.CreditCard,
  })
  method: PaymetMethod;

  @Column()
  amount: number;

  @OneToOne(() => OrderEntity, (order) => order.payment)
  order: OrderEntity;

  @Column({ name: 'canceled_amount' })
  canceledAmount: number;

  @Column({ name: 'canceled_at' })
  canceledAt: Date;
}
