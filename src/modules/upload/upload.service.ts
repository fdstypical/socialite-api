import { Injectable } from '@nestjs/common';
import { StaticFieldModel } from '../../models/StaticField/staticFieldModel';
import { CreateStaticFieldAttrs } from '../../models/StaticField/interfaces';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(StaticFieldModel)
    private readonly staticRepository: typeof StaticFieldModel,
  ) {}

  async create(staticField: CreateStaticFieldAttrs) {
    return await this.staticRepository.create(staticField);
  }

  async getById(id: number) {
    return await this.staticRepository.findOne({ where: { id } });
  }

  async getByName(fileName: string) {
    return await this.staticRepository.findOne({ where: { fileName } });
  }

  async delete(id: number) {
    return await this.staticRepository.destroy({ where: { id } });
  }
}
