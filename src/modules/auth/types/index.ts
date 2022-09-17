import { RoleName } from "src/types/common.types";

export interface TokenPayload {
  id: number;
  email: string;
  roleId: number;
  roleName: RoleName;
}
