import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Location } from 'src/models/Location/location.model';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [SequelizeModule.forFeature([Location])],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
