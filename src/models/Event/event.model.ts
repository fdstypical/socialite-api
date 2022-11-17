import { Model, Table } from 'sequelize-typescript';
import { CreateEventAttributes } from './interfaces';

@Table({ tableName: 'events' })
export class Event extends Model<Event, CreateEventAttributes> {}
