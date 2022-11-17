import { Column, DataType, Model, Table } from 'sequelize-typescript';
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
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  readonly startDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  readonly isPrivate: boolean = false;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  readonly expiredDate: Date | null;
}
