import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import {
  User,
  Location,
  Interest,
  PlaceInterest,
  StaticField,
} from 'src/models';
import { CreatePlaceAttributes } from './interfaces';

@Table({ tableName: 'places' })
export class Place extends Model<Place, CreatePlaceAttributes> {
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
  readonly name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  readonly description: string;

  @ForeignKey(() => Location)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly locationId: number;

  @BelongsTo(() => Location, 'locationId')
  readonly location: Location;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly createdByUserId: number;

  @BelongsTo(() => User, 'createdByUserId')
  readonly creator: User;

  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: true })
  readonly previewId: number;

  @BelongsTo(() => StaticField, 'previewId')
  readonly preview: StaticField;

  @BelongsToMany(() => Interest, () => PlaceInterest, 'placeId', 'interestId')
  readonly interests: Interest[];
}
