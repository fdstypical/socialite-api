import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ValidationKey } from 'src/types/validation.types';
import { Gender } from 'src/types/common.types';

export class CreateUserDto {
  @IsString({ message: ValidationKey.MUST_BE_STRING })
  readonly name: string;

  @IsNumber({}, { message: ValidationKey.MUST_BE_NUMBER })
  readonly age: number;

  @IsString({ message: ValidationKey.MUST_BE_STRING })
  @IsEmail({}, { message: ValidationKey.MUST_BE_EMAIL })
  readonly email: string;

  @IsString({ message: ValidationKey.MUST_BE_STRING })
  @MinLength(6, {
    message: ValidationKey.MUST_BE_LONGER,
    context: { minLength: 6 },
  })
  readonly password: string;

  @IsEnum(Gender, {
    each: true,
    message: ValidationKey.MUST_BE_ENUM,
    context: {
      availableValues: Object.values(Gender),
    },
  })
  readonly gender: Gender;
}
