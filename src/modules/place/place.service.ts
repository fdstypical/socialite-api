import { Includeable } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from 'src/core/exceptions/build-in/not-found.exception';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { Nullable } from 'src/core/types/app.types';
import { Place } from 'src/models';
import { CreatePlaceDto } from './dtos/create.dto';
import { AddAttachmentDto } from './dtos/add-attachment.dto';
import { PlaceInterestService } from '../place-interest/place-interest.service';
import { PlaceAttachmentService } from '../place-attachment/place-attachment.service';
import { AddInterestsDto } from '../interest/dtos/add-interests.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place) private readonly placeRepository: typeof Place,
    private readonly placeInterestService: PlaceInterestService,
    private readonly placeAttachmentService: PlaceAttachmentService,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async create(dto: CreatePlaceDto) {
    const { id: userId } = this.asyncContext.get('user');
    return this.placeRepository.create({ ...dto, createdByUserId: userId });
  }

  async addInterests(placeId: number, dto: AddInterestsDto) {
    return this.placeInterestService.add(placeId, dto.interests);
  }

  async deleteInterest(placeId: number, interestId: number) {
    return this.placeInterestService.delete(placeId, interestId);
  }

  async addAttachment(dto: AddAttachmentDto) {
    return this.placeAttachmentService.addAttachment(dto);
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
