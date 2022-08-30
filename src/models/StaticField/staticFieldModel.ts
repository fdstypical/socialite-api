import { Column, DataType, Table } from 'sequelize-typescript';
import { Model } from 'sequelize';
import { CreateStaticFieldAttrs } from './interfaces';

@Table({
  tableName: 'static_field',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
})
export class StaticFieldModel extends Model<
  StaticFieldModel,
  CreateStaticFieldAttrs
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
  readonly fileName: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly type: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly url: number;
}
