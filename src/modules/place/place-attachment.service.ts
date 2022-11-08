import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaceAttachment } from 'src/models';
import { CreatePlaceAttachmentAttributes } from 'src/models/PlaceAttachments/interfaces';

@Injectable()
export class PlaceAttachmentService {
  constructor(
    @InjectModel(PlaceAttachment)
    private readonly placeAttachmentRepoository: typeof PlaceAttachment,
  ) {}

  add({ placeId, fileId }: CreatePlaceAttachmentAttributes) {
    return this.placeAttachmentRepoository.create({ placeId, fileId });
  }
}
