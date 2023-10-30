import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrackListModel } from './tracklist.model';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Sequelize } from 'sequelize-typescript';
import { TracksService } from 'src/tracks/tracks.service';
import { PlaylistModel } from 'src/playlist/playlist.model';

@Injectable()
export class TracklistService {
  constructor(
    @InjectModel(TrackListModel)
    private tracklistModel: typeof TrackListModel,
    @InjectModel(PlaylistModel)
    private playlistModel: typeof PlaylistModel,
    private playlistService: PlaylistService,
    private trackService: TracksService,
    private sequelize: Sequelize,
  ) { }

  async create(playlistId: number, trackId: number) {
    try {
      this.sequelize.transaction(async (transaction) => {
        const transactionHost = { transaction };

        const track = await this.trackService.findById(trackId);

        const playlist = await this.playlistModel.findOne({
          where: { id: playlistId, isActive: true },
        });

        await this.playlistService.edit(playlistId, {
          ...playlist,
          playtime: playlist.playtime + track.duration,
        });

        await this.tracklistModel.create(
          { playlistId, trackId },
          transactionHost,
        );
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(playlistId: number, trackId: number) {
    try {
      this.sequelize.transaction(async (transaction) => {
        const track = await this.trackService.findById(trackId);

        const playlist = await this.playlistModel.findOne({
          where: { id: playlistId, isActive: true },
        });

        await this.playlistService.edit(playlistId, {
          ...playlist,
          playtime: playlist.playtime - track.duration,
        });

        this.tracklistModel.update(
          { isActive: false },
          { where: { playlistId, trackId } },
        );
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
