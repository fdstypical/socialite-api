import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiConfigService } from 'src/core/modules/shared/services/api-config.service';
import { UrlService } from 'src/core/modules/shared/services/url.service';
import { UploadService } from './upload.service';

@Controller('uploads')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ApiConfigService,
    private readonly urlService: UrlService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File) {
    const { filename: name, mimetype: type, path } = file;
    const { href: url } = this.urlService.createUri(
      this.configService.AppConfig.baseUrl,
      path,
    );
    return this.uploadService.create({ name, type, url });
  }
}
