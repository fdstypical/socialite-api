import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Place } from 'src/models';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [SequelizeModule.forFeature([Place])],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
