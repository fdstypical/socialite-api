import { Gender } from 'src/types/common.types';

export interface UserCreationAttrs {
  name: string;
  email: string;
  password: string;
  status?: string;
  gender: Gender;
  roleId: number;
}
