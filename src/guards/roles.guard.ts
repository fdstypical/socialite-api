import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { RoleService } from 'src/modules/role/role.service';
import { RoleName } from 'src/types/common.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || !roles.length) return true;

    return this.matchRoles(
      roles,
      this.asyncContext.get('user').roleId as number,
    );
  }

  private async matchRoles(
    requiredRoles: RoleName[],
    userRoleId: number,
  ): Promise<boolean> {
    const userRole = await this.roleService.getById(userRoleId);
    if (!userRole) return false;
    return requiredRoles.includes(userRole.name);
  }
}
