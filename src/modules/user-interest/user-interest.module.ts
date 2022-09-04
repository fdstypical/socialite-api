import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserInterest } from 'src/models';
import { UserInterestService } from './user-interest.service';

@Module({
  imports: [SequelizeModule.forFeature([UserInterest])],
  providers: [UserInterestService],
  exports: [UserInterestService],
})
export class UserInterestModule {}
