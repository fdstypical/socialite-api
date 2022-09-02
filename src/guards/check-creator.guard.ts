import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { ForbiddenException } from 'src/core/exceptions/build-in/forbidden.exception';
import { AsyncContext } from 'src/core/modules/async-context/async-context';

@Injectable()
export class CheckCreatorGuard implements CanActivate {
  constructor(private readonly asyncContext: AsyncContext<string, any>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const { id } = this.asyncContext.get('user');
      const isCreator = id === request.body.createdByUserId;

      if (!isCreator)
        throw new ForbiddenException(
          ErrorMessage.Forbidden,
          'You must be the creator',
        );

      return true;
    } catch (error) {
      throw new ForbiddenException(
        ErrorMessage.Forbidden,
        'You must be the creator',
      );
    }
  }
}
