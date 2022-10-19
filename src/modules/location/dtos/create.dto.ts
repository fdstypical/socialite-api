import { IsNumber, IsOptional, IsString } from "class-validator";
import { ConstraintMessage } from "src/constants/error.messages";

export class CreateLocationDto {
  @IsString({message: ConstraintMessage.MUST_BE_STRING})
  readonly country: string;

  @IsString({message: ConstraintMessage.MUST_BE_STRING})
  readonly administrativeArea: string;

  @IsString({message: ConstraintMessage.MUST_BE_STRING})
  readonly thoroughfare: string;

  @IsOptional()
  @IsString({message: ConstraintMessage.MUST_BE_STRING})
  readonly premise?: string;
  
  @IsNumber({}, {message: ConstraintMessage.MUST_BE_NUMBER})
  readonly lat: number;

  @IsNumber({}, {message: ConstraintMessage.MUST_BE_NUMBER})
  readonly lng: number;
}