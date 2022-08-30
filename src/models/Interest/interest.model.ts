import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { CreateRoleDto } from 'src/modules/role/dto/create.dto';
import { RoleName } from 'src/types/common.types';
import { User } from '../User/user.model';

@Table({ tableName: 'interest' })
export class InterestModel extends Model<InterestModel, CreateRoleDto> {
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
    allowNull: false,
  })
  readonly title: string | null;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  readonly description: string | null;

  @HasMany(() => User)
  readonly users: User[];
}
