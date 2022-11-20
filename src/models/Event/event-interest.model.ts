import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Event, Interest } from 'src/models';
import { CreateEventInterestAttributes } from './interfaces';

@Table({ tableName: 'events_interests' })
export class EventInterest extends Model<
  EventInterest,
  CreateEventInterestAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  readonly id: number;

  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly eventId: number;

  @ForeignKey(() => Interest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly interestId: number;
}
