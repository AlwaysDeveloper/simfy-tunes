import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TracklistService } from './tracklist.service';

@ApiTags('TrackList')
@Controller('tracklist')
export class TracklistController {
  constructor(private tracklistService: TracklistService) {}

  @Post(':playlistId/add/:trackId')
  create(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    this.tracklistService.create(playlistId, trackId);
  }

  @Delete(':playlistId/add/:trackId')
  remove(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    this.tracklistService.remove(playlistId, trackId);
  }
}
