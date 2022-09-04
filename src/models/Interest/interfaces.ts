import { CreateInterestDto } from 'src/modules/interest/dtos/create.dto';

export interface CreateInterestAttributes extends CreateInterestDto {
  readonly createdByUserId: number;
}
