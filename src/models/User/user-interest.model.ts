import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Interest, User } from 'src/models';
import { CreateUserInterestAttributes } from './interfaces';

@Table({ tableName: 'users_interests' })
export class UserInterest extends Model<
  UserInterest,
  CreateUserInterestAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  readonly id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number;

  @ForeignKey(() => Interest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly interestId: number;
}
