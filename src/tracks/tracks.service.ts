import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { TrackModel } from 'src/tracks/track.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  constructor(
    @InjectModel(TrackModel)
    private trackModel: typeof TrackModel,
  ) { }

  async create(track: Track): Promise<Track> {
    return this.trackModel.create({ ...track });
  }

  async findAll(): Promise<Track[]> {
    return this.trackModel.findAll();
  }

  async findById(id: number): Promise<Track> {
    const result = await this.trackModel.findOne({ where: { id } });
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }

  async edit(id, track: Track): Promise<Track> {
    this.trackModel.update(track, { where: { id } });
    return track;
  }
}
