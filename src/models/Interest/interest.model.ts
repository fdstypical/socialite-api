import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { CreateInterestDto } from 'src/modules/interest/dtos/create.dto';
import { StaticField } from 'src/models';

@Table({ tableName: 'interests' })
export class Interest extends Model<Interest, CreateInterestDto> {
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

  @BelongsTo(() => StaticField, 'previewId')
  readonly preview: StaticField;
}
