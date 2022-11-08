import { Includeable } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { NotFoundException } from 'src/core/exceptions/build-in/not-found.exception';
import { Nullable } from 'src/core/types/app.types';
import { User } from 'src/models';
import { RoleName } from 'src/types/common.types';
import { LifePhotoService } from '../life-photo/life-photo.service';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dtos/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RoleService,
    private readonly lifePhotoService: LifePhotoService,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async deleteById(id: number) {
    return this.userRepository.destroy({ where: { id } });
  }

  async getAll(include: Includeable[] = []) {
    return this.userRepository.findAll({ include });
  }

  async getByEmail(
    email: string,
    rejectOnEmpty: Nullable<Error> = null,
    include: Includeable[] = [],
  ) {
    return this.userRepository.findOne({
      where: { email },
      include,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessage.NotFound, 'No such user'),
    });
  }

  async getById(
    id: number,
    rejectOnEmpty: Nullable<Error> = null,
    include: Includeable[] = [],
  ) {
    return this.userRepository.findByPk(id, {
      include,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessage.NotFound, 'No such user'),
    });
  }

  async create(dto: CreateUserDto) {
    const [userRole] = await this.findOrCreateRole(RoleName.USER);
    return this.userRepository.create({ ...dto, roleId: userRole.id });
  }

  async addPhoto(id: number) {
    const { id: userId } = this.asyncContext.get('user');
    return this.lifePhotoService.addPhotoToUser({
      userId,
      fileId: id,
    });
  }

  private async findOrCreateRole(roleName: RoleName) {
    return this.roleService.findOrCreate({ name: roleName });
  }
}
