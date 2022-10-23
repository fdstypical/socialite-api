import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/models';
import { CreatePlaceAttributes } from './interfaces';

@Table({ tableName: 'places' })
export class Place extends Model<Place, CreatePlaceAttributes> {
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
  readonly description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly createdByUserId: number;

  @BelongsTo(() => User, 'createdByUserId')
  readonly creator: User;
}
