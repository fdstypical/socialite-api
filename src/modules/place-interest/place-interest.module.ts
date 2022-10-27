import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceInterest } from 'src/models';
import { PlaceInterestService } from './place-interest.service';

@Module({
  imports: [SequelizeModule.forFeature([PlaceInterest])],
  providers: [PlaceInterestService],
  exports: [PlaceInterestService],
})
export class PlaceInterestModule {}
