import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateInterestDto } from './dtos/create.dto';
import { InterestService } from './interest.service';
import { UpdateInterestDto } from './dtos/update.dto';
import { CheckCreatorGuard } from 'src/guards/check-creator.guard';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get()
  async getAll() {
    return this.interestService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.interestService.getById(id);
  }

  @UseGuards(CheckCreatorGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInterestDto,
  ) {
    delete (dto as any).id;
    return this.interestService.update(id, dto);
  }

  @Post()
  async create(@Body() dto: CreateInterestDto) {
    return this.interestService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.interestService.delete(id);
  }
}
