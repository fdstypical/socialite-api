import { CreateUserDto } from 'src/modules/user/dtos/create.dto';

export interface UserCreationAttributes extends CreateUserDto {
  readonly roleId: number;
}

export interface CreateUserAvatarAttributes {
  userId: number;
  fileId: number;
}

export interface CreateUserInterestAttributes {
  userId: number;
  interestId: number;
}

export interface CreateUserPhotoAttributes {
  userId: number;
  fileId: number;
}
