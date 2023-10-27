import { Track } from 'src/tracks/interfaces/track.interface';
import { Playlist } from '../interfaces/playlist.interface';
import { ApiProperty } from '@nestjs/swagger';

export class EditPlailistDto implements Playlist {
  @ApiProperty()
  name: string;
  @ApiProperty()
  creator: number;
  @ApiProperty()
  playtime: number = undefined;
  @ApiProperty()
  isActive: boolean = undefined;
  tracklist: Track[] = undefined;
}
