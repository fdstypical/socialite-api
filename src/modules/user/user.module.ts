import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, UserAvatar, UserInterest } from 'src/models';
import { LifePhotoModule } from '../life-photo/life-photo.module';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterestService } from './user-interest.service';
import { UserAvatarService } from './user-avatar.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserInterest, UserAvatar]),
    RoleModule,
    LifePhotoModule,
  ],
  providers: [UserService, UserInterestService, UserAvatarService],
  controllers: [UserController],
  exports: [UserService, UserInterestService, UserAvatarService],
})
export class UserModule {}
