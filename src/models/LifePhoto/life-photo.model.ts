import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User, StaticField } from 'src/models';
import { CreateLifePhotoAttributes } from './interfaces';

@Table({ tableName: 'life_photos' })
export class LifePhoto extends Model<LifePhoto, CreateLifePhotoAttributes> {
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

  @BelongsTo(() => User, 'userId')
  readonly user: User;

  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly fileId: StaticField;

  @BelongsTo(() => StaticField, 'fileId')
  readonly file: StaticField;
}
