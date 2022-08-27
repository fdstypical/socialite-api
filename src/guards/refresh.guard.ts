import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { BadRequestException } from '../core/exceptions/build-in/bad-request.exception';

@Injectable()
export class RefreshGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { refresh: token } = request.cookies;
    if (!token)
      throw new BadRequestException(
        ErrorMessage.BadRequest,
        'Refresh token not passed',
      );
    return true;
  }
}
