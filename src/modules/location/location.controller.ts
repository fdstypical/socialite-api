import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ConstraintMessage } from 'src/constants/error.messages';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
import { CreateLocationDto } from './dtos/create.dto';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }

  @Get()
  getAll() {
    return this.locationService.getAll();
  }

  @Get(':id')
  getByid(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    id: number,
  ) {
    return this.locationService.getById(id);
  }
}
