import { CreatePlaceDto } from 'src/modules/place/dtos/create.dto';

export interface CreatePlaceAttributes extends CreatePlaceDto {
  createdByUserId: number;
}

export interface CreatePlaceInterestAttributes {
  placeId: number;
  interestId: number;
}

export interface CreatePlaceAttachmentAttributes {
  placeId: number;
  fileId: number;
}
