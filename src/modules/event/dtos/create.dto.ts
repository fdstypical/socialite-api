import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';

export class CreateEventDto {
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly title: string;

  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly description: string;

  @IsDateString({ strict: true }, { message: ConstraintMessage.MUST_BE_DATE })
  readonly dateStart: string;

  @IsOptional()
  @IsBoolean({ message: ConstraintMessage.MUST_BE_BOOL })
  readonly isPrivate: boolean;

  @IsOptional()
  @IsDateString({ strict: true }, { message: ConstraintMessage.MUST_BE_DATE })
  readonly expiredDate: string;
}
