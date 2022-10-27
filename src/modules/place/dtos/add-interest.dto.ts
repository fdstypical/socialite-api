import { IsInt } from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';

export class AddInterestDto {
  @IsInt({ message: ConstraintMessage.MUST_BE_INTEGER })
  readonly placeId: number;

  @IsInt({ message: ConstraintMessage.MUST_BE_INTEGER })
  readonly interestId: number;
}
