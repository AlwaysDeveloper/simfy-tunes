import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dtos/createPlaylist.dto.';
import { Playlist } from './interfaces/playlist.interface';
import { EditPlailistDto } from './dtos/editPlaylist.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @ApiQuery({ name: 'search', schema: { type: 'string' }, required: false })
  @ApiQuery({ name: 'limit', schema: { type: 'string' }, required: false })
  @ApiQuery({ name: 'page', schema: { type: 'string' }, required: false })
  @Get()
  async findAll(
    @Query('search') search: string = '',
    @Query('limit') limit: number = 10,
    @Query('page') page: number,
  ): Promise<Playlist[]> {
    return this.playlistService.findAll(search, limit, page);
  }

  @ApiParam({
    name: 'id',
    schema: { type: 'number' },
    required: true,
    description: 'ID of the playlist.',
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Playlist> {
    return this.playlistService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() editPlaylistDto: EditPlailistDto,
  ) {
    return this.playlistService.edit(id, editPlaylistDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.playlistService.remove(id);
  }
}
