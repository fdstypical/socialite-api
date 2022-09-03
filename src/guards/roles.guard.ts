import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { ForbiddenException } from 'src/core/exceptions/build-in/forbidden.exception';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { RoleName } from 'src/types/common.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || !roles.length) return true;

    return this.matchRoles(roles, this.asyncContext.get('user').roleName);
  }

  private async matchRoles(
    requiredRoles: RoleName[],
    userRole: RoleName,
  ): Promise<boolean> {
    if (requiredRoles.includes(userRole)) {
      return true;
    }

    throw new ForbiddenException(ErrorMessage.Forbidden, 'Not enough rights');
  }
}
