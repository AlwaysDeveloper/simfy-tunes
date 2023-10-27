import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackListModel } from './tracklist.model';
import { TracklistService } from './tracklist.service';
import { TracklistController } from './tracklist.controller';
import { PlaylistService } from 'src/playlist/playlist.service';
import { PlaylistModel } from 'src/playlist/playlist.model';
import { TracksService } from 'src/tracks/tracks.service';
import { TrackModel } from 'src/tracks/track.model';

@Module({
  imports: [
    SequelizeModule.forFeature([TrackListModel]),
    SequelizeModule.forFeature([PlaylistModel]),
    SequelizeModule.forFeature([TrackModel]),
  ],
  exports: [SequelizeModule],
  providers: [TracklistService, PlaylistService, TracksService],
  controllers: [TracklistController],
})
export class TrackListModule {}
