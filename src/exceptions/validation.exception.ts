import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'src/types/common';

export class ValidationException extends HttpException {
  public readonly messages: ValidationError[];
  public readonly reason: string;

  constructor(response: ValidationError[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
