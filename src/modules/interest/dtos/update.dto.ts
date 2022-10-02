import { IsInt, IsOptional, IsString } from 'class-validator';
import { ConstraintMessage } from 'src/constants/error.messages';

export class UpdateInterestDto {
  @IsOptional()
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly title: string;

  @IsOptional()
  @IsString({ message: ConstraintMessage.MUST_BE_STRING })
  readonly description: string;

  @IsOptional()
  @IsInt({ message: ConstraintMessage.MUST_BE_INTEGER })
  readonly previewId: number;
}
