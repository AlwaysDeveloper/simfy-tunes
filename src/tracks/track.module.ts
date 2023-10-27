import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModel } from 'src/tracks/track.model';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  imports: [SequelizeModule.forFeature([TrackModel])],
  exports: [SequelizeModule],
  providers: [TracksService],
  controllers: [TracksController]
})
export class TrackModule {}
