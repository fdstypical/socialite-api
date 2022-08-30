import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { UnprocessableEntityException } from 'src/core/exceptions/build-in/unprocessable-entity.exception';

@Controller('uploads')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async upload(file: Express.Multer.File) {
    console.log(file);
    return { ...file };
  }
}
