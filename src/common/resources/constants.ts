export enum ROLE_TYPE {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
}

export enum TOKEN_TYPE {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum USER_STATUS {
  PENDING = 1,
  ACTIVE = 2,
  INACTIVE = 3,
}

export enum PRODUCT_STATUS {
  PENDING = 1,
  ACTIVE = 2,
  INACTIVE = 3,
}

// export enum PAYMENT_METHOD {
//   CREDIT_CARD = 1,
//   BANK_TRANSFER = 2,
// }

export const PAYMENT_METHOD = {
  CREDIT_CARD: 1,
  BANK_TRANSFER: 2,
};

export type PAYMENT_METHOD =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export enum COURIER_LIST {
  CJ = 1,
  HANJIN = 2,
  HYUNDAI = 3,
}

export const SEEDER = {
  sellerId1: '0fbfde54-4d15-490f-8653-899236631d9e',
  sellerId2: 'd699cb8f-cb9e-4301-ad12-d7d859cc6f3f',
  sellerId3: '52b2d39c-47b4-4d2f-97ee-4fd135870cb9',

  customerId: 'bc4806f0-8668-4998-b610-27a046b9c4cd',

  productId1: 'e58ebbc1-6d85-46c2-8c1b-183ded15f9bc',
  productId2: 'dc620d83-f58b-4109-ac34-9467a71c4117',
  productId3: '90bfe00d-832d-4459-9537-ebc47418965a',

  orderId1: '93fd5c73-6992-4973-bdf2-15872518057a',
  orderId2: 'ec930a41-392a-4f75-83fc-9bc6cadd05a0',

  orderItemId11: '6ce5141f-5db1-4174-a328-4385e0bffee7',
  orderItemId12: '5b9f35a5-5327-415a-8aa2-f7af0bad6874',
  orderItemId21: 'ee128c23-725e-4bd2-90c0-db457923b416',
  orderItemId22: '7f7c833a-377a-4555-9e0d-5d80c357e8bd',
};
