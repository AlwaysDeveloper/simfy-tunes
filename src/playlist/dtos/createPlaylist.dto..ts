import { Track } from 'src/tracks/interfaces/track.interface';
import { Playlist } from '../interfaces/playlist.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto implements Playlist {
  @ApiProperty()
  playlistArtwork: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  name: string;
  @ApiProperty()
  creator: number;
  @ApiProperty()
  playtime: number;
  @ApiProperty()
  tracklist: Track[];
}
