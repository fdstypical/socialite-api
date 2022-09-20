import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { NotFoundException } from 'src/core/exceptions/build-in/not-found.exception';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { Interest, StaticField, User } from 'src/models';
import { CreateInterestDto } from './dtos/create.dto';
import { UpdateInterestDto } from './dtos/update.dto';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest) private readonly interestRepository: typeof Interest,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async getAll() {
    return this.interestRepository.findAll({
      include: { all: true },
    });
  }

  async getById(id: number, rejectOnEmpty?: Error) {
    return this.interestRepository.findByPk(id, {
      include: [StaticField],
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessage.NotFound, 'No such interest'),
    });
  }

  async create(dto: CreateInterestDto) {
    const userId = this.asyncContext.get('user').id;
    return this.interestRepository.create({ ...dto, createdByUserId: userId });
  }

  async update(id: number, dto: UpdateInterestDto) {
    return this.interestRepository.update({ ...dto }, { where: { id } });
  }

  async delete(id: number) {
    return this.interestRepository.destroy({ where: { id } });
  }
}
