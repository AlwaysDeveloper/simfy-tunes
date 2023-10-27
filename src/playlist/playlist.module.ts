import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistModel } from './playlist.model';

@Module({
  imports: [SequelizeModule.forFeature([PlaylistModel])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
