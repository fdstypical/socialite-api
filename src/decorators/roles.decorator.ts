import { SetMetadata } from '@nestjs/common';
import { RoleName } from 'src/types/common.types';

export const ROLES_KEY = Symbol('Roles');

export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);
