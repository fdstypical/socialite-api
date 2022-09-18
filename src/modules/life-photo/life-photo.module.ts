import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LifePhoto } from 'src/models';
import { LifePhotoService } from './life-photo.service';

@Module({
  imports: [SequelizeModule.forFeature([LifePhoto])],
  providers: [LifePhotoService],
  exports: [LifePhotoService],
})
export class LifePhotoModule {}
