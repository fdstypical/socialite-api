import { HttpStatus } from '@nestjs/common';
import { ErrorMessage } from 'src/constants/error.messages';
import { BaseException } from 'src/exceptions/base.exception';

export const BaseExceptionFactory = <T>(
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  message: ErrorMessage = ErrorMessage.InternalError,
  messages?: T[],
) => new BaseException<T>({ statusCode, message, messages }, statusCode);
