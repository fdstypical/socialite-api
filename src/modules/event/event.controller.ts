import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEventDto } from './dtos/create.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  getAll() {
    return this.eventService.getAll();
  }
}
