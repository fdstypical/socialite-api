import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoleName } from 'src/types/common.types';
import { ValidationErrorMessage } from 'src/constants/error.messages';

export class CreateRoleDto {
  @IsNumber({}, { message: ValidationErrorMessage.MUST_BE_NUMBER })
  readonly level: number;

  @IsEnum(RoleName, {
    each: true,
    message: ValidationErrorMessage.MUST_BE_ENUM,
    context: {
      availableValues: Object.values(RoleName),
    },
  })
  readonly name: RoleName;

  @IsOptional()
  @IsString({ message: ValidationErrorMessage.MUST_BE_STRING })
  readonly description: string;
}
