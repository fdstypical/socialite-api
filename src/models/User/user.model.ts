import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { Gender } from 'src/types/common.types';
import { Interest, Role, UserAvatar, UserInterest } from 'src/models';
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
  readonly id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  readonly name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  readonly age: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  readonly email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  readonly password: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  readonly status: string | null;

  @Column({
    type: DataType.ENUM({ values: Object.values(Gender) }),
    allowNull: false,
  })
  readonly gender: Gender;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly roleId: number;

  @BelongsTo(() => Role, 'roleId')
  readonly role: Role;

  @HasMany(() => Interest)
  readonly createdInterests: Interest[];

  @BelongsToMany(() => Interest, () => UserInterest)
  readonly interests: Interest[];

  @HasOne(() => UserAvatar)
  readonly avatar: UserAvatar;
}
