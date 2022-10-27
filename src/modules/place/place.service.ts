import { Includeable } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from 'src/core/exceptions/build-in/not-found.exception';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { Nullable } from 'src/core/types/app.types';
import { Place } from 'src/models';
import { CreatePlaceDto } from './dtos/create.dto';
import { AddInterestDto } from './dtos/add-interest.dto';
import { PlaceInterestService } from '../place-interest/place-interest.service';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place) private readonly placeRepository: typeof Place,
    private readonly placeInterestService: PlaceInterestService,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async create(dto: CreatePlaceDto) {
    const { id: userId } = this.asyncContext.get('user');
    return this.placeRepository.create({ ...dto, createdByUserId: userId });
  }

  async addInterest(dto: AddInterestDto) {
    return this.placeInterestService.addInterestToPlace(dto);
  }

  async getById(
    id: number,
    rejectOnEmpty: Nullable<Error> = null,
    include: Includeable[] = [],
  ) {
    return this.placeRepository.findByPk(id, {
      include,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessage.NotFound, 'No such place'),
    });
  }

  async getAll(include: Includeable[] = []) {
    return this.placeRepository.findAll({ include });
  }
}
