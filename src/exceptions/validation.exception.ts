import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'src/types/validation.types';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { AbstractException } from 'src/core/exceptions/abstract.exception';

export class ValidationException extends AbstractException<ValidationError> {
  constructor(response: ValidationError[]) {
    super(
      {
        message: ErrorMessage.ValidationError,
        messages: response,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
