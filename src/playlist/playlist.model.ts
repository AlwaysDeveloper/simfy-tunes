import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Playlist } from './interfaces/playlist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { TrackListModel } from '../tracklist/tracklist.model';

@Table({ tableName: 'playlists' })
export class PlaylistModel extends Model implements Playlist {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: null,
    field: 'id',
  })
  id: number;

  @Column({ allowNull: false, field: 'name' })
  name: string;

  @Column({ allowNull: false, field: 'creator' })
  creator: number;

  @Column({ allowNull: false, field: 'playtime', defaultValue:0 })
  playtime: number;

  @Column({ allowNull: false, defaultValue: true })
  isActive: boolean;

  @HasMany(() => TrackListModel)
  tracklist: Track[];
}
