import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
    RoleModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
