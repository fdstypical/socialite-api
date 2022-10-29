import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Place } from 'src/models';
import { PlaceInterestModule } from '../place-interest/place-interest.module';
import { PlaceAttachmentModule } from '../place-attachment/place-attachment.module';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Place]),
    PlaceInterestModule,
    PlaceAttachmentModule,
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
