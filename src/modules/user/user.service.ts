import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseException } from 'src/exceptions/base.exception';
import { Role, User } from 'src/models';
import { RoleName } from 'src/types/common.types';
import {
  ErrorMessage,
  UserValidationMessage,
} from 'src/constants/error.messages';
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
    return this.createOrReject(dto, userRole);
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

  private async createOrReject(dto: CreateUserDto, userRole: Role) {
    const candidate = await this.getByEmail(dto.email);

    if (candidate)
      throw new BaseException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ErrorMessage.Conflict,
          messages: [UserValidationMessage.NOT_UNIQUE],
        },
        HttpStatus.CONFLICT,
      );

    return this.userRepository.create({
      ...dto,
      roleId: userRole.id,
    });
  }
}
