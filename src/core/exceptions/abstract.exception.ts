import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionResponse } from '../types/common.types';

export abstract class AbstractException<T> extends HttpException {
  constructor(response: BaseExceptionResponse<T>, status: HttpStatus) {
    super(response, status);
  }
}
