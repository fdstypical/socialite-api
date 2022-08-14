import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseException } from 'src/exceptions/base.exception';
import { Role, User } from 'src/models';
import { RoleName } from 'src/types/common.types';
import { ErrorMessage } from 'src/constants/error.messages';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async getAll() {
    return this.userRepository.findAll({ include: [Role] });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, include: [Role] });
  }

  async create(dto: CreateUserDto) {
    const userRole = await this.getRole();
    return this.userRepository.create({ ...dto, roleId: userRole.id });
  }

  private async getRole(roleName: RoleName = RoleName.USER) {
    const role = await this.roleService.getByName(roleName);

    if (!role)
      throw new BaseException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessage.InternalError,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return role;
  }
}
