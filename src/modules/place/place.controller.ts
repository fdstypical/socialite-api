import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConstraintMessage } from 'src/constants/error.messages';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
import { AddInterestDto } from './dtos/add-interest.dto';
import { CreatePlaceDto } from './dtos/create.dto';
import { PlaceService } from './place.service';
import {
  creatorInclude,
  locationInclude,
  interestsInclude,
} from 'src/models/includes/place.includes';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() dto: CreatePlaceDto) {
    return this.placeService.create(dto);
  }

  @Post('addInterest')
  addInterest(@Body() dto: AddInterestDto) {
    return this.placeService.addInterest(dto);
  }

  @Get()
  getAll() {
    return this.placeService.getAll([locationInclude]);
  }

  @Get(':id')
  getById(
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
    return this.placeService.getById(id, null, [
      locationInclude,
      interestsInclude,
      creatorInclude,
    ]);
  }
}
