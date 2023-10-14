import { NotFoundException } from '@nestjs/common';
import { messages } from '../resources';

export class OrderNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(messages.ORDER_NOT_FOUND_EXCEPTION, error);
  }
}
