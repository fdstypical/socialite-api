import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Place, PlaceAttachment, PlaceInterest } from 'src/models';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceInterestService } from './place-interest.service';
import { PlaceAttachmentService } from './place-attachment.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Place, PlaceInterest, PlaceAttachment]),
  ],
  providers: [PlaceService, PlaceInterestService, PlaceAttachmentService],
  controllers: [PlaceController],
  exports: [PlaceService, PlaceInterestService, PlaceAttachmentService],
})
export class PlaceModule {}
