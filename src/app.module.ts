import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModel } from './tracks/track.model';
import { TrackModule } from './tracks/track.module';
import { PlaylistModule } from './playlist/playlist.module';
import { TracklistController } from './tracklist/tracklist.controller';
import { TracklistService } from './tracklist/tracklist.service';
import { TrackListModule } from './tracklist/tracklist.module';
import { PlaylistModel } from './playlist/playlist.model';
import { TrackListModel } from './tracklist/tracklist.model';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      username: 'root',
      password: 'root',
      database: 'simfy_tunes',
      // port: 5432,
      synchronize: true,
      models: [TrackModel, PlaylistModel, TrackListModel]
    }),
    TrackModule,
    PlaylistModule,
    TrackListModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
