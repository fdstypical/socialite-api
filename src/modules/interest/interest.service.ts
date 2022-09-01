import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Interest, StaticField } from 'src/models';
import { CreateInterestDto } from './dtos/create.dto';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest) private readonly interestRepository: typeof Interest,
  ) {}

  async getAll() {
    return this.interestRepository.findAll({ include: [StaticField] });
  }

  async getById(id: number) {
    return this.interestRepository.findByPk(id, {
      include: [StaticField],
    });
  }

  async create(dto: CreateInterestDto) {
    return this.interestRepository.create(dto);
  }
}
