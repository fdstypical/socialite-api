import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateInterestDto } from './dtos/create.dto';
import { InterestService } from './interest.service';

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

  @Post()
  async create(@Body() dto: CreateInterestDto) {
    return this.interestService.create(dto);
  }
}
