import { HttpStatus } from '@nestjs/common';
import { AbstractException } from '../abstract.exception';

export class ForbiddenException extends AbstractException<any> {
  constructor(message: string, internalMessage?: string, messages?: any[]) {
    super({ message, internalMessage, messages }, HttpStatus.FORBIDDEN);
  }
}
