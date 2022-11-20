import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { StaticField, User, Interest, EventInterest } from 'src/models';
import { CreateEventAttributes } from './interfaces';

@Table({ tableName: 'events' })
export class Event extends Model<Event, CreateEventAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  readonly id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  readonly dateStart: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  readonly isPrivate: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  readonly expiredDate: Date | null;

  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: true })
  readonly previewId: number;

  @BelongsTo(() => StaticField, 'previewId')
  readonly preview: StaticField;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly createdByUserId: number;

  @BelongsTo(() => User, 'createdByUserId')
  readonly creator: User;

  @BelongsToMany(() => Interest, () => EventInterest, 'eventId', 'interestId')
  readonly interests: Interest[];
}
