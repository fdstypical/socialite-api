import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { BadRequestException } from 'src/core/exceptions/build-in/bad-request.exception';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { Interest, Role, StaticField, User, UserAvatar } from 'src/models';
import { RoleName } from 'src/types/common.types';
import { RoleService } from '../role/role.service';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserInterestService } from '../user-interest/user-interest.service';
import { CreateUserDto } from './dtos/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RoleService,
    private readonly userInterestService: UserInterestService,
    private readonly userAvatarService: UserAvatarService,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async getAll() {
    return this.userRepository.findAll({
      include: [
        Role,
        { model: Interest, as: 'createdInterests' },
        { model: Interest, as: 'interests' },
        { model: UserAvatar, include: [StaticField] },
      ],
    });
  }

  async getByEmail(email: string, rejectOnEmpty?: Error) {
    return this.userRepository.findOne({
      where: { email },
      include: [Role],
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(ErrorMessage.BadRequest, 'No such user'),
    });
  }

  async getById(id: number, rejectOnEmpty?: Error) {
    return this.userRepository.findByPk(id, {
      include: [Role],
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(ErrorMessage.BadRequest, 'No such user'),
    });
  }

  async create(dto: CreateUserDto) {
    const [userRole] = await this.findOrCreateRole(RoleName.USER);
    return this.userRepository.create(
      { ...dto, roleId: userRole.id },
      { include: [Role] },
    );
  }

  async addInterest(id: number) {
    const { id: userId } = this.asyncContext.get('user');
    return this.userInterestService.addInterestToUser({
      userId,
      interestId: id,
    });
  }

  async addAvatar(id: number) {
    const { id: userId } = this.asyncContext.get('user');
    return this.userAvatarService.addAvatarToUser({
      userId,
      fileId: id,
    });
  }

  private async findOrCreateRole(roleName: RoleName) {
    return this.roleService.findOrCreate({ name: roleName });
  }
}
