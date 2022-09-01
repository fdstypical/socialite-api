import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ApiConfigService } from 'src/core/modules/shared/services/api-config.service';
import { GeneratorService } from 'src/core/modules/shared/services/generator.service';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { UnprocessableEntityException } from 'src/core/exceptions/build-in/unprocessable-entity.exception';

export const MulterAdapter = (
  configService: ApiConfigService,
  generatorService: GeneratorService,
): MulterOptions => ({
  ...configService.MulterConfig,
  storage: diskStorage({
    destination: configService.MulterConfig.dest,
    filename: (_, file: Express.Multer.File, cb) =>
      cb(null, generatorService.fileName(extname(file.originalname))),
  }),
  fileFilter: (_, file: Express.Multer.File, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        new UnprocessableEntityException(ErrorMessage.ValidationError),
        false,
      );
    }

    return cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 },
});
