import { CreateUserDto } from 'src/modules/user/dtos/create.dto';

export interface UserCreationAttributes extends CreateUserDto {
  readonly roleId: number;
}
