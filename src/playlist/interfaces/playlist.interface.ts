import { Track } from 'src/tracks/interfaces/track.interface';

export interface Playlist {
  name: string;
  creator: number;
  playtime: number;
  isActive: boolean;
  playlistArtwork: string;
  tracklist: Track[];
}
