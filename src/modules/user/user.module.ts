import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LifePhoto, User, UserAvatar, UserInterest } from 'src/models';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterestService } from './user-interest.service';
import { UserAvatarService } from './user-avatar.service';
import { UserLifePhotoService } from './life-photo.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserInterest, UserAvatar, LifePhoto]),
    RoleModule,
  ],
  providers: [
    UserService,
    UserInterestService,
    UserAvatarService,
    UserLifePhotoService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    UserInterestService,
    UserAvatarService,
    UserLifePhotoService,
  ],
})
export class UserModule {}
