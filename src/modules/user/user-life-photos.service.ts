import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LifePhoto } from 'src/models';

@Injectable()
export class UserLifePhotoService {
  constructor(
    @InjectModel(LifePhoto)
    private readonly lifePhotoRepository: typeof LifePhoto,
  ) {}

  add(userId: number, fileId: number) {
    return this.lifePhotoRepository.create({ userId, fileId });
  }
}
