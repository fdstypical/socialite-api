import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserAvatar } from 'src/models';
import { CreateUserAvatarAttributes } from '../../models/UserAvatar/interfaces';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectModel(UserAvatar)
    private readonly userAvatarRepository: typeof UserAvatar,
  ) {}

  addAvatarToUser({ userId, fileId }: CreateUserAvatarAttributes) {
    return this.userAvatarRepository.create({ userId, fileId });
  }
}
