import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { isDevelopment } from '.';
import * as WinstonCloudwatch from 'winston-cloudwatch';

const { combine, timestamp, printf, colorize } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const color = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'white',
  silly: 'gray',
};

const logLevel = () => {
  return isDevelopment() ? 'debug' : 'http';
};

// Add colors to the logger
winston.addColors(color);

const customLogFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf((aLog) => {
    const nestReqId = aLog.alsCtx?.nestReqId;
    const nestReqIdStr = nestReqId //
      ? `[${nestReqId}]`
      : '';
    const stackStr =
      aLog.stack && aLog.stack[0] !== undefined //
        ? ` \n ${aLog.stack}`
        : '';
    return `[${aLog.timestamp}] [${aLog.level}] ${nestReqIdStr}: ${aLog.message}${stackStr}`;
  }),
);

const consoleOnlyOptions = {
  handleExceptions: true,
  level: process.env.NODE_ENV === 'production' ? 'error' : 'silly',
  format: combine(colorize({ all: true })),
};

const cloudwatchConfig = {
  logGroupName:
    process.env.AWS_LOG_GROUP_NAME || //
    'HHP-8th-nestjs-log-group-fallback',
  logStreamName:
    process.env.AWS_LOG_STREAM_NAME || //
    'HHP-8th-nestjs-log-stream-fallback',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  messageFormatter: ({ level, message, additionalInfo, nestReqId }) => {
    const nestReqIdStr = nestReqId //
      ? `[${nestReqId}]`
      : '';
    return `[${level}] ${nestReqIdStr}: ${message} \nAdditional Info: ${JSON.stringify(
      additionalInfo,
    )}`;
  },
};

const cloudwatchHelper = new WinstonCloudwatch(cloudwatchConfig);

const transports = [
  cloudwatchHelper,
  new winston.transports.Console(consoleOnlyOptions),
  new winston.transports.File({
    level: 'error',
    filename: 'storage/logs/nest-error.log',
    maxsize: 5 * 1024 * 1024,
    tailable: true,
  }),
  new winston.transports.File({
    // level: 'info',
    level: 'silly',
    filename: 'storage/logs/nest-all.log',
    maxsize: 5 * 1024 * 1024,
    tailable: true,
  }),
];

export const WinstonLogger = WinstonModule.createLogger({
  level: logLevel(),
  levels,
  format: customLogFormat,
  transports,
});
