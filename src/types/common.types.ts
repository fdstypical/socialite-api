import { HttpStatus } from '@nestjs/common';
import { ErrorMessage } from 'src/constants/error.messages';
import { Record } from './app.types';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum RoleName {
  USER = 'user',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export interface BaseErrorResponse<T> extends Record<string, any> {
  statusCode: HttpStatus;
  message: ErrorMessage;
  messages?: T[];
}
