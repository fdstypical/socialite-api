import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../User/user.model';
import { StaticField } from '../StaticField/static-field.model';
import { CreateUserStaticFieldAttributes } from './interfaces';

@Table({
  tableName: 'user_static_field',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
})
export class UserStaticField extends Model<
  UserStaticField,
  CreateUserStaticFieldAttributes
> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly userId: number;

  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly staticFieldId: number;
}
