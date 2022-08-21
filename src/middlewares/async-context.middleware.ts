import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { UuidService } from 'src/shared/services/uuid.service';

@Injectable()
export class AsyncContextMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncContext: AsyncContext<string, any>,
    private readonly uuidService: UuidService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.asyncContext.register();
    this.asyncContext.set('traceId', this.uuidService.v4());
    next();
  }
}
