import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Gender } from 'src/types/common.types';
import { Role } from '../Role/role.model';
import { UserCreationAttributes } from './interfaces';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
})
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  status?: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(Gender) }),
    allowNull: false,
  })
  gender: Gender;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
