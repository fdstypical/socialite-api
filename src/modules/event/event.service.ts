import { Includeable } from 'sequelize/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { Event } from 'src/models';
import { CreateEventDto } from './dtos/create.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private readonly eventRepository: typeof Event,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async create(dto: CreateEventDto) {
    const { id: userId } = this.asyncContext.get('user');
    return this.eventRepository.create({ ...dto, createdByUserId: userId });
  }

  async getAll(include: Includeable[] = []) {
    return this.eventRepository.findAll({ include });
  }
}
