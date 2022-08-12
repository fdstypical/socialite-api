import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseErrorResponse } from 'src/types/common.types';

export class BaseException<T> extends HttpException {
  constructor(response: BaseErrorResponse<T>, status: HttpStatus) {
    super(response, status);
  }
}
