import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ValidationErrorMessage } from 'src/constants/error.messages';
import { Gender } from 'src/types/common.types';

export class CreateUserDto {
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly name: string;

  @IsNumber({}, { message: ValidationErrorMessage.MUST_BE_NUMBER })
  readonly age: number;

  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  @IsEmail({}, { message: ValidationErrorMessage.MUST_BE_EMAIL })
  readonly email: string;

  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  @MinLength(6, {
    message: ValidationErrorMessage.MUST_BE_LONGER,
    context: { minLength: 6 },
  })
  readonly password: string;

  @IsEnum(Gender, {
    each: true,
    message: ValidationErrorMessage.MUST_BE_ENUM,
    context: {
      availableValues: Object.values(Gender),
    },
  })
  readonly gender: Gender;

  @IsOptional()
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  status?: string;
}
