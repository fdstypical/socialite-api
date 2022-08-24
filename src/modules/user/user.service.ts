import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from 'src/models';
import { RoleName } from 'src/types/common.types';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dtos/create.dto';

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
    const [userRole] = await this.findOrCreateRole(RoleName.USER);
    return this.userRepository.create({ ...dto, roleId: userRole.id });
  }

  private async findOrCreateRole(roleName: RoleName) {
    return await this.roleService.findOrCreate({ name: roleName });
  }
}
