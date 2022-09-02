import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Interest, StaticField } from 'src/models';
import { CreateInterestDto } from './dtos/create.dto';
import { UpdateInterestDto } from './dtos/update.dto';
import { BadRequestException } from '../../core/exceptions/build-in/bad-request.exception';
import { ErrorMessage } from '../../core/constants/error.messages';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest) private readonly interestRepository: typeof Interest,
  ) {}

  async getAll() {
    return this.interestRepository.findAll({ include: [StaticField] });
  }

  async getById(id: number, rejectOnEmpty?: Error) {
    return this.interestRepository.findByPk(id, {
      include: [StaticField],
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(ErrorMessage.BadRequest, 'No such user'),
    });
  }

  async create(dto: CreateInterestDto) {
    return this.interestRepository.create(dto);
  }

  async update(id: number, dto: UpdateInterestDto) {
    return this.interestRepository.update({ ...dto }, { where: { id } });
  }

  async delete(id: number) {
    return this.interestRepository.destroy({ where: { id } });
  }
}
