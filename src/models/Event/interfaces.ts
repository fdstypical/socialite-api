import { CreateEventDto } from 'src/modules/event/dtos/create.dto';

export interface CreateEventAttributes extends CreateEventDto {
  createdByUserId: number;
}

export interface CreateEventInterestAttributes {
  eventId: number;
  interestId: number;
}
