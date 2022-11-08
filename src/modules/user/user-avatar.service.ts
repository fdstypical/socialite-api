import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { UserAvatar } from 'src/models';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectModel(UserAvatar)
    private readonly userAvatarRepository: typeof UserAvatar,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  add(fileId: number) {
    const { id: userId } = this.asyncContext.get('user');
    return this.userAvatarRepository.create({ userId, fileId });
  }
}
