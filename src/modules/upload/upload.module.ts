import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiConfigService } from 'src/core/modules/shared/services/api-config.service';
import { GeneratorService } from 'src/core/modules/shared/services/generator.service';
import { SharedModule } from 'src/core/modules/shared/shared.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterAdapter } from './utils/multer.adapter';
import { StaticField } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([StaticField]),
    MulterModule.registerAsync({
      imports: [SharedModule],
      useFactory: (
        configService: ApiConfigService,
        generatorService: GeneratorService,
      ) => MulterAdapter(configService, generatorService),
      inject: [ApiConfigService, GeneratorService],
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
