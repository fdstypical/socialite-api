import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '../core/exceptions/build-in/forbidden.exception';
import { AsyncContext } from '../core/modules/async-context/async-context';

@Injectable()
export class CheckCreatorGuard<T> implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  handlerError() {
    throw new ForbiddenException('You must be is creator');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const { id } = this.asyncContext.get('user');
      const isCreator = id === request.body.createdByUserId;
      if (isCreator) return true;
      this.handlerError();
      return false;
    } catch (error) {
      this.handlerError();
      return false;
    }
  }
}
