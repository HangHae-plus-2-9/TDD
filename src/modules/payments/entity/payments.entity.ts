import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CommonColumns } from '@/common/entities/common-columns';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { PaymentMethod } from '@/modules/payments/enum/payment-method.enum';
import { PaymentStatus } from '@/modules/payments/enum/payment-status.enum';

@Entity()
export class Payments extends CommonColumns {
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CreditCard,
    name: 'payment_method_enum',
  })
  method: PaymentMethod;

  @Column()
  amount: number;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity;

  @Column({ name: 'canceled_amount', nullable: true })
  canceledAmount: number;

  @Column({ name: 'canceled_at', nullable: true })
  canceledAt: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    name: 'payment_status_enum',
  })
  status: PaymentStatus;
}
