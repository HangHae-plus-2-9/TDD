// request-id.provider.ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestIdProvider {
  constructor(@Inject(REQUEST) private request: Request) {}

  get requestId(): string {
    return this.request.headers['request-id'] as string;
  }
}
