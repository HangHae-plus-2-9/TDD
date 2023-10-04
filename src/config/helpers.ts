import { ConfigService } from '@nestjs/config';

// 개발 환경인지 확인하는 함수
export const isDevelopment = () =>
  // NODE_ENV 환경 변수가 설정되지 않았거나 'development'로 설정된 경우 true 반환
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// 환경 변수의 값을 얻는 함수
const getValue = (key: string, config?: ConfigService): string => {
  // config 객체가 제공되면, config에서 키 값을 얻고,
  // 그렇지 않으면 process.env에서 키 값을 얻는다.
  if (config) return config.get<string>(key);
  else return process.env[key];
};

// 필요한 환경 변수를 얻거나 기본값을 사용하는 함수
export const required = (
  key: string,
  config?: ConfigService,
  defaultValue?: unknown,
) => {
  // getValue 함수를 사용하여 환경 변수 값을 얻거나, 기본값을 사용한다.
  const value = getValue(key, config) || defaultValue;

  // 값이 null이나 undefined인 경우, 오류를 던진다.
  if (value == null) {
    throw new Error(
      // 오류 메시지는 어떤 키가 누락되었는지, 그리고 현재 환경이 무엇인지 알려준다.
      `Key ${key} is undefined in your .env.${process.env.NODE_ENV}`,
    );
  }

  // 최종적으로 결정된 값을 반환한다.
  return value;
};
