import { Module } from '@nestjs/common';
import { UserStaticFieldService } from './user-static-field.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStaticField } from '../../models/UserStaticField/user-static-field.model';

@Module({
  imports: [SequelizeModule.forFeature([UserStaticField])],
  providers: [UserStaticFieldService],
  exports: [UserStaticFieldService],
})
export class UserStaticFieldModule {}
