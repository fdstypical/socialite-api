import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateInterestDto } from './dtos/create.dto';
import { InterestService } from './interest.service';
import { UpdateInterestDto } from './dtos/update.dto';
import { CheckCreatorGuard } from 'src/guards/check-creator.guard';
import { IsModel } from 'src/decorators/is-model.decorator';
import { Interest } from 'src/models';
import {
  creatorInclude,
  previewInclude,
} from 'src/models/includes/interest.include';
import { ConstraintMessage } from 'src/constants/error.messages';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get()
  async getAll() {
    return this.interestService.getAll([previewInclude, creatorInclude]);
  }

  @Get(':id')
  async getById(
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
    return this.interestService.getById(id, null, [previewInclude]);
  }

  @IsModel(Interest)
  @UseGuards(CheckCreatorGuard)
  @Patch(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    id: number,
    @Body() dto: UpdateInterestDto,
  ) {
    delete (dto as any).id;
    delete (dto as any).createdByUserId;
    return this.interestService.update(id, dto);
  }

  @Post()
  async create(@Body() dto: CreateInterestDto) {
    return this.interestService.create(dto);
  }

  @IsModel(Interest)
  @UseGuards(CheckCreatorGuard)
  @Delete(':id')
  async delete(
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
    return this.interestService.delete(id);
  }
}
