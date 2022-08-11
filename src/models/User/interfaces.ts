import { CreateUserDto } from 'src/modules/user/dto/create.dto';

export interface UserCreationAttributes extends CreateUserDto {
  roleId: number;
}
