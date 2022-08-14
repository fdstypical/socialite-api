import { CreateUserDto } from 'src/modules/user/dto/create.dto';

export interface UserCreationAttributes extends CreateUserDto {
  readonly roleId: number;
}
