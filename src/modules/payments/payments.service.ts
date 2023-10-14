import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Payments} from "@/modules/payments/entity/payments.entity";

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: Repository<Payments>) {
  }
}
