import { Injectable } from '@nestjs/common';
import { Playlist } from './interfaces/playlist.interface';
import { InjectModel } from '@nestjs/sequelize';
import { PlaylistModel } from './playlist.model';
import { Op } from 'sequelize';
import { TrackListModel } from 'src/tracklist/tracklist.model';
import { TrackModel } from 'src/tracks/track.model';

@Injectable()
export class PlaylistService {
  private readonly playlists: Playlist[] = [];

  constructor(
    @InjectModel(PlaylistModel)
    private playlistModel: typeof PlaylistModel,
  ) {}

  async create(playlist: Playlist): Promise<Playlist> {
    return this.playlistModel.create({ ...playlist });
  }

  async findAll(
    search: string = '',
    limit: number = 10,
    page: number = 1,
  ): Promise<Playlist[]> {
    return this.playlistModel.findAll({
      limit,
      offset: (page - 1) * limit,
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
        isActive: true,
      },
    });
  }

  async findById(playlistId: number): Promise<Playlist> {
    return this.playlistModel.findOne({
      where: {
        id: playlistId,
      },
      include: [
        {
          model: TrackListModel,
          required: false,
          where: {
            isActive: true,
          },
          include: [
            {
              model: TrackModel,
            },
          ],
        },
      ],
    });
  }

  async edit(id, playlist: Playlist): Promise<Playlist> {
    this.playlistModel.update(
      { name: playlist.name, creator: playlist.creator },
      { where: { id } },
    );
    return playlist;
  }

  async remove(playlistId: number) {
    this.playlistModel.update(
      { isActive: false },
      { where: { id: playlistId } },
    );
  }
}
