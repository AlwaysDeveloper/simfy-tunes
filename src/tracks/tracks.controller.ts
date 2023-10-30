import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dtos/createTrack.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() editTrackDto: CreateTrackDto,
  ): Promise<Track> {
    return this.trackService.edit(id, editTrackDto);
  }
}
