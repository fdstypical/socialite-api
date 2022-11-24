import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable } from 'sequelize';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { NotFoundException } from 'src/core/exceptions/build-in/not-found.exception';
import { Nullable } from 'src/core/types/app.types';
import { Location } from 'src/models/Location/location.model';
import { CreateLocationDto } from './dtos/create.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location) private readonly locationRepository: typeof Location,
  ) {}

  async getAll(include: Includeable[] = []) {
    return this.locationRepository.findAll({ include });
  }

  async getById(id: number, rejectOnEmpty: Nullable<Error> = null) {
    return this.locationRepository.findByPk(id, {
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessage.NotFound, 'No such lication'),
    });
  }

  async create(dto: CreateLocationDto) {
    return this.locationRepository.create(dto);
  }
}
