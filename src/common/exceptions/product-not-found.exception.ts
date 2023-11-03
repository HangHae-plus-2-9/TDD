import { NotFoundException } from '@nestjs/common';
import { messages } from '../resources';

export class ProductNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(messages.PRODUCT_NOT_FOUND_EXCEPTION, error);
  }
}
