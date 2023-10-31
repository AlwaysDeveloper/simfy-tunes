import { Test, TestingModule } from '@nestjs/testing';
import { TracklistService } from './tracklist.service';
import { TrackListModel } from './tracklist.model';
import { PlaylistModel } from 'src/playlist/playlist.model';
import { PlaylistService } from 'src/playlist/playlist.service';
import { TracksService } from 'src/tracks/tracks.service';
import { getModelToken } from '@nestjs/sequelize';
import { EditPlailistDto } from 'src/playlist/dtos/editPlaylist.dto';

const trackList = {
  id: 1,
  playlistId: 1,
  trackId: 1,
  isActive: true
};

const playlist = {
  id: 1,
  name: "Gym Workout",
  creator: 567,
  playtime: 540,
  isActive: false,
  tracklist: [
    {
      name: "Pump-Up Power",
      album: "Workout Mix",
      artist: "Fitness Fanatic",
      duration: 240,
      artwork: "workout.jpg",
      audio: "workout.mp3",
    },
    {
      name: "Cardio Blast",
      album: "Fitness Grooves",
      artist: "Sweat Slinger",
      duration: 300,
      artwork: "cardio.jpg",
      audio: "cardio.mp3",
    }
  ]
};

const track = {
  id: 2,
  name: "Track 5",
  album: "Album 0",
  artist: "Artist 2",
  duration: 210,
  artwork: "track4.jpg",
  audio: "track4.mp3",
}

describe('TracklistService', () => {
  let service: TracklistService;
  let trackListModel: TrackListModel;
  let playlistModel: PlaylistModel;
  let playlistService: PlaylistService;
  let trackService: TracksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracklistService,
        {
          provide: getModelToken(TrackListModel),
          useValue: {
            create: jest.fn(() => trackList),
            remove: jest.fn(() => ({ ...trackList, isActive: false }))
          }
        },
        {
          provide: getModelToken(PlaylistModel),
          useValue: {
            findOne: jest.fn(() => playlist)
          }
        },
        {
          provide: PlaylistService,
          useValue: {
            edit: jest.fn().mockImplementation((id: number, playlist: EditPlailistDto) => Promise.resolve({ id, ...playlist })),
          }
        },
        {
          provide: TracksService,
          useValue: {
            findById: jest.fn().mockResolvedValue(track),
          }
        }
      ],
    }).compile();

    service = module.get<TracklistService>(TracklistService);
    playlistModel = module.get(getModelToken(PlaylistModel));
    trackListModel = module.get(getModelToken(TrackListModel));
    playlistService = module.get<PlaylistService>(PlaylistService);
    trackService = module.get<TracksService>(TracklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create tracklist.', () => {
    const result = service.create(playlist.id, track.id);
    expect(result).resolves.toEqual({ id: 1, playlistId: playlist.id, trackId: track.id, isActive: true });
    expect(trackService.findById).toHaveBeenCalled();
    expect(trackService.findById).toHaveBeenCalledWith(track.id);
    expect(playlistService.edit).toHaveBeenCalled();
    expect(playlistService.edit).toHaveBeenCalledWith(playlist.id);
  });

  it('should remove tracklist.', () => {
    const result = service.remove(playlist.id, track.id);
    expect(result).resolves.toEqual({ id: 1, playlistId: playlist.id, trackId: track.id, isActive: false });
    expect(trackService.findById).toHaveBeenCalled();
    expect(trackService.findById).toHaveBeenCalledWith(track.id);
    expect(playlistService.edit).toHaveBeenCalled();
    expect(playlistService.edit).toHaveBeenCalledWith(playlist.id);
  });
});
