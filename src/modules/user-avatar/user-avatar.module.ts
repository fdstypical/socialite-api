import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAvatar } from 'src/models';
import { UserAvatarService } from './user-avatar.service';

@Module({
  imports: [SequelizeModule.forFeature([UserAvatar])],
  providers: [UserAvatarService],
  exports: [UserAvatarService],
})
export class UserAvatarModule {}
