import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaticFieldAttributes } from 'src/models/StaticField/interfaces';
import { StaticField } from 'src/models';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(StaticField)
    private readonly staticRepository: typeof StaticField,
  ) {}

  async create(dto: CreateStaticFieldAttributes) {
    return this.staticRepository.create(dto);
  }

  async getById(id: number) {
    return this.staticRepository.findByPk(id);
  }

  async getByName(name: string) {
    return this.staticRepository.findOne({ where: { name } });
  }

  async delete(id: number) {
    return this.staticRepository.destroy({ where: { id } });
  }
}
