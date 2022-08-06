import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError, ErrorMessage } from 'src/types/validation.types';

export class ValidationException extends HttpException {
  public readonly messages: ValidationError[];

  constructor(response: ValidationError[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ErrorMessage.ValidationError,
        messages: response,
      },
      HttpStatus.BAD_REQUEST,
    );
    this.messages = response;
  }
}
