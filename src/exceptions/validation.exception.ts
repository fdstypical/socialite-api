import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError, ErrorMessage } from 'src/types/common';

export class ValidationException extends HttpException {
  public readonly messages: ValidationError[];
  public readonly reason: string;

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
