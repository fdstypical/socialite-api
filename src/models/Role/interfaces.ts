import { RoleName } from 'src/types/common.types';

export interface CreateRoleAttributes {
  readonly name: RoleName;
  readonly description?: string;
}
