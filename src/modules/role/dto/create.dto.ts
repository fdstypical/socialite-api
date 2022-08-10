import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoleName } from 'src/types/common.types';
import { ValidationKey } from 'src/types/validation.types';

export class CreateRoleDto {
  @IsNumber({}, { message: ValidationKey.MUST_BE_NUMBER })
  readonly level: number;

  @IsEnum(RoleName, {
    each: true,
    message: ValidationKey.MUST_BE_ENUM,
    context: {
      availableValues: Object.values(RoleName),
    },
  })
  readonly name: RoleName;

  @IsOptional()
  @IsString({ message: ValidationKey.MUST_BE_STRING })
  readonly description: string;
}
