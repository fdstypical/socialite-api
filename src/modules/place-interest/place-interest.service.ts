import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaceInterest } from 'src/models';
import { CreatePlaceInterestAttributes } from 'src/models/PlaceInterest/interfaces';

@Injectable()
export class PlaceInterestService {
  constructor(
    @InjectModel(PlaceInterest)
    private readonly placeInterestRepository: typeof PlaceInterest,
  ) {}

  addInterestToPlace({ placeId, interestId }: CreatePlaceInterestAttributes) {
    return this.placeInterestRepository.create({ placeId, interestId });
  }
}
