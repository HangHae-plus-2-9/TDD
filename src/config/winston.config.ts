import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { isDevelopment } from '.';

const { combine, timestamp, printf, colorize } = winston.format;

// 로그의 레벨을 정의합니다. 각 로그 레벨은 우선순위를 가지며, 숫자가 낮을수록 더 높은 우선순위를 가집니다.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// 각 로그 레벨에 적용될 색상을 정의합니다.
const color = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'white',
  silly: 'gray',
};

// 로그 레벨을 환경(개발/운영)에 따라 결정하는 함수입니다.
const logLevel = () => {
  return isDevelopment() ? 'debug' : 'http';
};

// winston에 로그 레벨별 색상을 추가합니다.
winston.addColors(color);

// 사용자 정의 로그 포맷을 정의합니다.
const customLogFormat = combine(
  // 로그에 시간 정보를 추가합니다.
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  // 로그 출력 형태를 정의합니다.
  printf((aLog) => {
    if (aLog.stack && aLog.stack[0] !== undefined) {
      return `[${aLog.timestamp}] [${aLog.level}]: ${aLog.message} \n ${aLog.stack}`;
    }
    return `[${aLog.timestamp}] [${aLog.level}]: ${aLog.message}`;
  }),
);

// 콘솔에만 로그를 출력하는 옵션을 정의합니다.
const consoleOnlyOptions = {
  handleExceptions: true,
  level: process.env.NODE_ENV === 'production' ? 'error' : 'silly',
  format: combine(colorize({ all: true })),
};

// 로그의 저장 위치와 방법을 정의합니다.
const transports = [
  new winston.transports.Console(consoleOnlyOptions), // 콘솔에 로그를 출력합니다.
  new winston.transports.File({
    // 에러 로그를 파일로 저장합니다.
    level: 'error',
    filename: 'storage/logs/nest-error.log',
    maxsize: 5 * 1024 * 1024,
    tailable: true,
  }),
  new winston.transports.File({
    // 모든 로그를 파일로 저장합니다.
    level: 'silly',
    filename: 'storage/logs/nest-all.log',
    maxsize: 5 * 1024 * 1024,
    tailable: true,
  }),
];

// Winston 로거를 생성하고 설정합니다.
export const WinstonLogger = WinstonModule.createLogger({
  level: logLevel(), // 현재 로그 레벨을 설정합니다.
  levels, // 로그 레벨을 설정합니다.
  format: customLogFormat, // 로그의 형식을 설정합니다.
  transports, // 로그의 저장 방식과 위치를 설정합니다.
});
