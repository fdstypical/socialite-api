import { IsEmail, IsString } from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';

export class LoginDto {
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  @IsEmail({}, { message: ConstraintMessage.MUST_BE_EMAIL })
  readonly email: string;

  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly password: string;
}
