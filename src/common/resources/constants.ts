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
