import { IsInt, IsArray } from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';

export class AddInterestsDto {
  @IsArray({ message: ConstraintMessage.MUST_BE_ENUM })
  @IsInt({ each: true, message: ConstraintMessage.MUST_BE_INTEGER })
  readonly interests: number[];
}
