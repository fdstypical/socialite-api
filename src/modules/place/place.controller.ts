import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConstraintMessage } from 'src/constants/error.messages';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
import { CreatePlaceDto } from './dtos/create.dto';
import { AddAttachmentDto } from './dtos/add-attachment.dto';
import { PlaceService } from './place.service';
import { PlaceInterestService } from './place-interest.service';
import { PlaceAttachmentService } from './place-attachment.service';
import { AddInterestsDto } from '../interest/dtos/add-interests.dto';
import {
  creatorInclude,
  locationInclude,
  interestsInclude,
  previewInclude,
  attachmentInclude,
} from 'src/models/includes/place.includes';

@Controller('places')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly placeInterestService: PlaceInterestService,
    private readonly placeAttachmentService: PlaceAttachmentService,
  ) {}

  @Post()
  create(@Body() dto: CreatePlaceDto) {
    return this.placeService.create(dto);
  }

  @Post(':placeId/interests')
  addInterest(
    @Param(
      'placeId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    placeId: number,
    @Body() dto: AddInterestsDto,
  ) {
    return this.placeInterestService.add(placeId, dto.interests);
  }

  @Delete(':placeId/interests/:interestId')
  deleteInterest(
    @Param(
      'placeId',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    placeId: number,
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
    return this.placeInterestService.delete(placeId, interestId);
  }

  @Post('attachment')
  addAttachment(@Body() dto: AddAttachmentDto) {
    return this.placeAttachmentService.add(dto);
  }

  @Get()
  getAll() {
    return this.placeService.getAll([locationInclude, previewInclude]);
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
      previewInclude,
      attachmentInclude,
    ]);
  }
}
