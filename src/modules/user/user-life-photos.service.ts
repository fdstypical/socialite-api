import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LifePhoto } from 'src/models';
import { CreateLifePhotoAttributes } from 'src/models/LifePhoto/interfaces';

@Injectable()
export class UserLifePhotoService {
  constructor(
    @InjectModel(LifePhoto)
    private readonly lifePhotoRepository: typeof LifePhoto,
  ) {}

  add({ userId, fileId }: CreateLifePhotoAttributes) {
    return this.lifePhotoRepository.create({ userId, fileId });
  }
}
