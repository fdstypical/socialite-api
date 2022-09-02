import { IsInt, IsOptional, IsString } from 'class-validator';
import { ValidationErrorMessage } from 'src/constants/error.messages';

export class UpdateInterestDto {
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly title: string;

  @IsOptional()
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly description?: string;

  @IsInt({ message: ValidationErrorMessage.MUST_BE_INTEGER })
  readonly previewId: number;
}
