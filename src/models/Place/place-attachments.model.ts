import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Place, StaticField } from 'src/models';
import { CreatePlaceAttachmentAttributes } from './interfaces';

@Table({ tableName: 'place_attachments' })
export class PlaceAttachment extends Model<
  PlaceAttachment,
  CreatePlaceAttachmentAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  readonly id: number;

  @ForeignKey(() => Place)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly placeId: number;

  @BelongsTo(() => Place, 'placeId')
  readonly place: Place;

  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly fileId: StaticField;

  @BelongsTo(() => StaticField, 'fileId')
  readonly file: StaticField;
}
