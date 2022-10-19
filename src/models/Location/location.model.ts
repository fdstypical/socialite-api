import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreateLocationAttributes } from './interfaces';

@Table({ tableName: 'locations' })
export class Location extends Model<Location, CreateLocationAttributes> {
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
  readonly country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly administrativeArea: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly thoroughfare: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  readonly premise: string | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  readonly lat: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  readonly lng: number;
}
