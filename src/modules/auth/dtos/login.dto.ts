import { IsEmail, IsString } from 'class-validator';
import { ValidationErrorMessage } from 'src/constants/error.messages';

export class LoginDto {
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  @IsEmail({}, { message: ValidationErrorMessage.MUST_BE_EMAIL })
  readonly email: string;

  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly password: string;
}
