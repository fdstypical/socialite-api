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
    const userRole = await this.getRole();
    return this.createOrReject(dto, userRole);
  }

  async getAll() {
    return this.userRepository.findAll({ include: [Role] });
  }

  private async getRole(roleName: RoleName = RoleName.USER) {
    const role = await this.roleService.getByName(roleName);

    if (!role)
      throw new HttpException(
        ErrorMessage.InternalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return role;
  }

  private async createOrReject(dto: CreateUserDto, userRole: Role) {
    const candidate = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (candidate)
      throw new HttpException(
        ErrorMessage.InternalError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.userRepository.create({
      ...dto,
      roleId: userRole.id,
    });
  }
}
