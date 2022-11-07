import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, UserInterest } from 'src/models';
import { LifePhotoModule } from '../life-photo/life-photo.module';
import { RoleModule } from '../role/role.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterestService } from './user-interest.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserInterest]),
    RoleModule,
    UserAvatarModule,
    LifePhotoModule,
  ],
  providers: [UserService, UserInterestService],
  controllers: [UserController],
  exports: [UserService, UserInterestService],
})
export class UserModule {}
