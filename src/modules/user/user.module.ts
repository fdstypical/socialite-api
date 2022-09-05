import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models';
import { RoleModule } from '../role/role.module';
import { UserInterestModule } from '../user-interest/user-interest.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserStaticFieldModule } from '../user-static-field/user-static-field.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    RoleModule,
    UserInterestModule,
    UserStaticFieldModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
