import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create.dto';
import { EventService } from './event.service';
import { EventInterestService } from './event-interest.service';
import { AddInterestsDto } from '../interest/dtos/add-interests.dto';
import {
  creatorInclude,
  previewInclude,
} from 'src/models/includes/event.includes';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
import { ConstraintMessage } from 'src/constants/error.messages';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventInterestService: EventInterestService,
  ) {}

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Post(':eventId/interests')
  addInterest(
    @Param(
      'eventId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    eventId: number,
    @Body() dto: AddInterestsDto,
  ) {
    return this.eventInterestService.add(eventId, dto.interests);
  }

  @Delete(':eventId/interests/:interestId')
  deleteInterest(
    @Param(
      'eventId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    eventId: number,
    @Param(
      'interestId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    interestId: number,
  ) {
    return this.eventInterestService.delete(eventId, interestId);
  }

  @Get()
  getAll() {
    return this.eventService.getAll([previewInclude, creatorInclude]);
  }
}
