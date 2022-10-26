import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Place, Interest } from 'src/models';
import { CreatePlaceAttributes } from '../Place/interfaces';

@Table({ tableName: 'places_interests' })
export class PlaceInterest extends Model<PlaceInterest, CreatePlaceAttributes> {
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

  @ForeignKey(() => Interest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly interestId: number;
}
