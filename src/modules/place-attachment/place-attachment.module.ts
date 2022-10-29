import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceAttachment } from 'src/models';
import { PlaceAttachmentService } from './place-attachment.service';

@Module({
  imports: [SequelizeModule.forFeature([PlaceAttachment])],
  providers: [PlaceAttachmentService],
  exports: [PlaceAttachmentService],
})
export class PlaceAttachmentModule {}
