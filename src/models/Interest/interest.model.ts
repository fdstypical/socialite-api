import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { StaticField, User, UserInterest } from 'src/models';
import { CreateInterestAttributes } from './interfaces';

@Table({ tableName: 'interests' })
export class Interest extends Model<Interest, CreateInterestAttributes> {
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
    defaultValue: null,
  })
  readonly description: string | null;

  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly previewId: number;

  @BelongsTo(() => StaticField, 'previewId')
  readonly preview: StaticField;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly createdByUserId: number;

  @BelongsTo(() => User, 'createdByUserId')
  readonly creator: User;

  @BelongsToMany(() => User, () => UserInterest, 'userId')
  readonly users: User[];
}
