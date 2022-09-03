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
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number;

  @ForeignKey(() => Interest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly interestId: number;
}
