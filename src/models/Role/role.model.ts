import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { RoleName } from 'src/types/common.types';
import { User } from 'src/models';
import { CreateRoleAttributes } from './interfaces';

@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRoleAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  readonly id: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(RoleName) }),
    unique: true,
    allowNull: false,
  })
  readonly name: RoleName;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  readonly description: string | null;

  @HasMany(() => User, 'roleId')
  readonly users: User[];
}
