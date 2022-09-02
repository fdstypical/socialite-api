import { IsInt, IsString } from 'class-validator';
import { ValidationErrorMessage } from 'src/constants/error.messages';

export class UpdateInterestDto {
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly title: string;

  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly description: string;

  @IsInt({ message: ValidationErrorMessage.MUST_BE_INTEGER })
  readonly previewId: number;

  @IsInt({ message: ValidationErrorMessage.MUST_BE_INTEGER })
  readonly createdByUserId: number;
}
