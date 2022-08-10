import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { CreateRoleDto } from 'src/modules/role/dto/create.dto';
import { RoleName } from 'src/types/common.types';
import { User } from '../User/user.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRoleDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  level: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(RoleName) }),
    unique: true,
    allowNull: false,
  })
  name: RoleName;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  description: string;

  @HasMany(() => User)
  users: User[];
}
