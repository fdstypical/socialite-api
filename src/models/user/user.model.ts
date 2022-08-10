import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreateUserDto } from 'src/modules/user/dto/create.dto';
import { Gender } from 'src/types/common.types';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
})
export class User extends Model<User, CreateUserDto> {
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
  status: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(Gender) }),
    allowNull: false,
  })
  gender: Gender;
}
