import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaceAttachment } from 'src/models';

@Injectable()
export class PlaceAttachmentService {
  constructor(
    @InjectModel(PlaceAttachment)
    private readonly placeAttachmentRepoository: typeof PlaceAttachment,
  ) {}

  add(placeId: number, fileId: number) {
    return this.placeAttachmentRepoository.create({ placeId, fileId });
  }
}
