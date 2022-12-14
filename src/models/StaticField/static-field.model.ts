import { Model, Column, DataType, Table } from 'sequelize-typescript';
import { CreateStaticFieldAttributes } from './interfaces';

@Table({
  tableName: 'static_field',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
})
export class StaticField extends Model<
  StaticField,
  CreateStaticFieldAttributes
> {
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
  readonly name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly originalname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly url: string;
}
