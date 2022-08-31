import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaticFieldAttrs } from 'src/models/StaticField/interfaces';
import { StaticField } from 'src/models';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(StaticField)
    private readonly staticRepository: typeof StaticField,
  ) {}

  async create(dto: CreateStaticFieldAttrs) {
    return this.staticRepository.create(dto);
  }

  async getById(id: number) {
    return this.staticRepository.findOne({ where: { id } });
  }

  async getByName(name: string) {
    return this.staticRepository.findOne({ where: { name } });
  }

  async delete(id: number) {
    return this.staticRepository.destroy({ where: { id } });
  }
}
