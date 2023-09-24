import { BaseRepositoryInterface } from '@/common/repositories/base.repository.interface';
import { OrderEntity } from '../entities/order.entity';

export interface OrdersRepositoryInterface
  extends BaseRepositoryInterface<OrderEntity> {
  doSomethingForOrder(): void;
}
