import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Constants } from 'src/constants/app.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getClass(),
    );

    if (isPublic) {
      return true;
    }

    try {
      const authHeader = request.headers.authorization;
      const [tokenType, token] = authHeader?.split(' ') || [];

      if (tokenType !== Constants.token_type || !token) return false;

      const payload = await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
