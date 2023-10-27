import { Column, Table, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import { PlaylistModel } from 'src/playlist/playlist.model';
import { TrackListModel } from 'src/tracklist/tracklist.model';
import { Track } from 'src/tracks/interfaces/track.interface';

@Table({ tableName: 'tracks' })
export class TrackModel extends Model implements Track {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: null,
    field: 'id',
  })
  id: number;

  @Column({ allowNull: false, field: 'name' })
  name: string;

  @Column({ allowNull: false, field: 'album' })
  album: string;

  @Column({ allowNull: false, field: 'artist' })
  artist: string;

  @Column({ allowNull: false, defaultValue: 0, field: 'duration' })
  duration: number;

  @Column({ allowNull: false, field: 'artwork' })
  artwork: string;

  @Column({ allowNull: false, field: 'audio' })
  audio: string;

  @HasMany(() => TrackListModel)
  playlists: PlaylistModel;
}
