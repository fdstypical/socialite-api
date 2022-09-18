import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models';
import { LifePhotoModule } from '../life-photo/life-photo.module';
import { RoleModule } from '../role/role.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserInterestModule } from '../user-interest/user-interest.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    RoleModule,
    UserInterestModule,
    UserAvatarModule,
    LifePhotoModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
