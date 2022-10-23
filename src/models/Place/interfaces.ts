import { CreatePlaceDto } from 'src/modules/place/dtos/create.dto';

export interface CreatePlaceAttributes extends CreatePlaceDto {
  createdByUserId: number;
}
