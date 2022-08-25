import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { BadRequestException } from 'src/core/exceptions/build-in/bad-request.exception';
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
    return this.userRepository.findOne({
      where: { email },
      include: [Role],
      rejectOnEmpty: new BadRequestException(
        ErrorMessage.BadRequest,
        'No such user',
      ),
    });
  }

  async getById(id: number) {
    return this.userRepository.findByPk(id, {
      rejectOnEmpty: new BadRequestException(
        ErrorMessage.BadRequest,
        'No such user',
      ),
    });
  }

  async create(dto: CreateUserDto) {
    const [userRole] = await this.findOrCreateRole(RoleName.USER);
    return this.userRepository.create({ ...dto, roleId: userRole.id });
  }

  private async findOrCreateRole(roleName: RoleName) {
    return await this.roleService.findOrCreate({ name: roleName });
  }
}
