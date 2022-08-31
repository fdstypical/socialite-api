import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException } from 'src/core/exceptions/build-in/unauthorized.exception';
import { Constants } from 'src/constants/app.constants';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { IS_PUBLIC_KEY } from 'src/decorators/public-controller.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getClass(),
    );

    if (isPublic) return true;

    try {
      const authHeader = request.headers.authorization;
      const [tokenType, token] = authHeader?.split(' ') || [];

      if (tokenType !== Constants.TOKEN_TYPE || !token)
        throw new UnauthorizedException(
          ErrorMessage.Unauthorized,
          'Token not passed',
        );

      const payload = await this.jwtService.verifyAsync(token);
      this.asyncContext.set('user', payload);

      return true;
    } catch (exception) {
      if (exception instanceof UnauthorizedException) throw exception;

      throw new UnauthorizedException(
        ErrorMessage.Unauthorized,
        'Token ferification failed',
      );
    }
  }
}
