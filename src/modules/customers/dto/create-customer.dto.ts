export class CreateCustomerDto {
  userId: number;
  name: string;
  zipCode: string;
  address1: string;
  address2?: string;
  addressDetail?: string;
}
