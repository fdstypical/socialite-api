import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from 'src/models';
import { ErrorMessage, RoleName } from 'src/types/common.types';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async create(dto: CreateUserDto) {
    const userRole = await this.roleService.getByName(RoleName.USER);

    if (!userRole)
      throw new HttpException(
        ErrorMessage.InternalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const user = await this.userRepository.create({
      ...dto,
      roleId: userRole.id,
    });

    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: [Role] });
    return users;
  }
}
