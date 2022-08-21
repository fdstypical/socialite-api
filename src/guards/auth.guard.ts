import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Constants } from 'src/constants/app.constants';
import { IS_PUBLIC_KEY } from 'src/decorators/public-controller.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getClass(),
    );

    if (isPublic) {
      return true;
    }

    try {
      const authHeader = request.headers.authorization;
      const [tokenType, token] = authHeader?.split(' ') || [];

      if (tokenType !== Constants.TOKEN_TYPE || !token) return false;

      const payload = await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
