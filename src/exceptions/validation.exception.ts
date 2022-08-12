import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'src/types/validation.types';
import { ErrorMessage } from 'src/constants/error.messages';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException<ValidationError> {
  constructor(response: ValidationError[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorMessage.ValidationError,
        messages: response,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
