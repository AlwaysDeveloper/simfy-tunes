import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TracklistService } from './tracklist.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('TrackList')
@Controller('tracklist')
export class TracklistController {
  constructor(private tracklistService: TracklistService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':playlistId/add/:trackId')
  create(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    this.tracklistService.create(playlistId, trackId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':playlistId/add/:trackId')
  remove(
    @Param('playlistId') playlistId: number,
    @Param('trackId') trackId: number,
  ) {
    this.tracklistService.remove(playlistId, trackId);
  }
}
