import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserAvatar } from 'src/models';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectModel(UserAvatar)
    private readonly userAvatarRepository: typeof UserAvatar,
  ) {}

  add(userId: number, fileId: number) {
    return this.userAvatarRepository.create({ userId, fileId });
  }
}
