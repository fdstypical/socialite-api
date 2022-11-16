import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPhoto, User, UserAvatar, UserInterest } from 'src/models';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterestService } from './user-interest.service';
import { UserAvatarService } from './user-avatar.service';
import { UserPhotoService } from './user-life-photos.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserInterest, UserAvatar, UserPhoto]),
    RoleModule,
  ],
  providers: [
    UserService,
    UserInterestService,
    UserAvatarService,
    UserPhotoService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    UserInterestService,
    UserAvatarService,
    UserPhotoService,
  ],
})
export class UserModule {}
