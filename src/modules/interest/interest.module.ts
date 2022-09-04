import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Interest } from 'src/models';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';

@Module({
  imports: [SequelizeModule.forFeature([Interest])],
  providers: [InterestService],
  controllers: [InterestController],
  exports: [InterestService],
})
export class InterestModule {}
