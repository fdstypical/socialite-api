import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserPhoto } from 'src/models';

@Injectable()
export class UserPhotoService {
  constructor(
    @InjectModel(UserPhoto)
    private readonly lifePhotoRepository: typeof UserPhoto,
  ) {}

  add(userId: number, fileId: number) {
    return this.lifePhotoRepository.create({ userId, fileId });
  }
}
