import { ApiProperty } from '@nestjs/swagger';
import { Track } from '../interfaces/track.interface';

export class CreateTrackDto implements Track {
  @ApiProperty()
  name: string;
  @ApiProperty()
  album: string;
  @ApiProperty()
  artist: string;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  artwork: string;
  @ApiProperty()
  audio: string;
}
