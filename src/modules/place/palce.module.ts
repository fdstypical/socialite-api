import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Place, PlaceInterest } from 'src/models';
import { PlaceAttachmentModule } from '../place-attachment/place-attachment.module';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceInterestService } from './place-interest.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Place, PlaceInterest]),
    PlaceAttachmentModule,
  ],
  providers: [PlaceService, PlaceInterestService],
  controllers: [PlaceController],
  exports: [PlaceService, PlaceInterestService],
})
export class PlaceModule {}
