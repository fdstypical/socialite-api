import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from 'src/models';
import { RoleName } from 'src/types/common.types';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dtos/create.dto';
import { BaseExceptionFactory } from 'src/factories/exception.factories/base.exception.vactory';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async getAll() {
    return this.userRepository.findAll({ include: [Role] });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, include: [Role] });
  }

  async getById(id: number) {
    return this.userRepository.findByPk(id);
  }

  async create(dto: CreateUserDto) {
    const userRole = await this.getRole();
    return this.userRepository.create({ ...dto, roleId: userRole.id });
  }

  private async getRole(roleName: RoleName = RoleName.USER) {
    const role = await this.roleService.getByName(roleName);

    if (!role) throw BaseExceptionFactory();

    return role;
  }
}
