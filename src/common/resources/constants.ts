// 역할(Role)에 관련된 열거형입니다.
export enum ROLE_TYPE {
  ADMIN = 'ADMIN', // 관리자
  CUSTOMER = 'CUSTOMER', // 고객
  SELLER = 'SELLER', // 판매자
}

// 토큰 종류에 관련된 열거형입니다.
export enum TOKEN_TYPE {
  ACCESS_TOKEN = 'ACCESS_TOKEN', // 액세스 토큰
  REFRESH_TOKEN = 'REFRESH_TOKEN', // 리프레쉬 토큰
}

// 사용자 상태에 관련된 열거형입니다.
export enum USER_STATUS {
  PENDING = 1, // 대기 중
  ACTIVE = 2, // 활성
  INACTIVE = 3, // 비활성
}
