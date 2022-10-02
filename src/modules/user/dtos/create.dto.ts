import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';
import { User } from 'src/models';
import { Gender } from 'src/types/common.types';
import { IsUnique, UniqueValidator } from 'src/decorators/unique.decorator';
import { Constants } from 'src/constants/app.constants';

export class CreateUserDto {
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly name: string;

  @IsNumber({}, { message: ConstraintMessage.MUST_BE_NUMBER })
  readonly age: number;

  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  @IsEmail({}, { message: ConstraintMessage.MUST_BE_EMAIL })
  @IsUnique(UniqueValidator, [User])
  readonly email: string;

  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  @MinLength(Constants.MIN_PASSWORD_LENGTH, {
    message: ConstraintMessage.MUST_BE_LONGER,
    context: { minLength: Constants.MIN_PASSWORD_LENGTH },
  })
  readonly password: string;

  @IsEnum(Gender, {
    message: ConstraintMessage.MUST_BE_ENUM,
    context: {
      availableValues: Object.values(Gender),
    },
  })
  readonly gender: Gender;

  @IsOptional()
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  status?: string;
}
