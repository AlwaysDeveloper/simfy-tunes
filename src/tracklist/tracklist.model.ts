import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PlaylistModel } from '../playlist/playlist.model';
import { TrackModel } from '../tracks/track.model';

@Table({ tableName: 'tracklist' })
export class TrackListModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: null,
    field: 'id',
  })
  id: number;

  @BelongsTo(() => PlaylistModel, { foreignKey: 'playlistId', as: 'playlist' })
  @ForeignKey(() => PlaylistModel)
  @Column({ allowNull: false })
  playlistId: number;

  @BelongsTo(() => TrackModel, { foreignKey: 'trackId', as: 'track' })
  @ForeignKey(() => TrackModel)
  @Column({ allowNull: false })
  trackId: number;

  @Column({ defaultValue: true })
  isActive: boolean;
}
