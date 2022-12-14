import { IsInt, IsOptional, IsString } from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';

export class CreatePlaceDto {
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly name: string;

  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly description: string;

  @IsInt({ message: ConstraintMessage.MUST_BE_INTEGER })
  readonly locationId: number;

  @IsOptional()
  @IsInt({ message: ConstraintMessage.MUST_BE_INTEGER })
  readonly previewId?: number;
}
