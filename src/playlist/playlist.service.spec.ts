import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from './playlist.service';
import { PlaylistModel } from './playlist.model';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';

const playlists = [
  {
    name: "Morning Vibes",
    creator: 456,
    playtime: 540,
    isActive: true,
    tracklist: [
      {
        name: "Sunrise Serenity",
        album: "Morning Melodies",
        artist: "Calm Composer",
        duration: 300,
        artwork: "sunrise.jpg",
        audio: "sunrise.mp3",
      },
      {
        name: "Nature's Awakening",
        album: "Awakening Sounds",
        artist: "Nature Lover",
        duration: 240,
        artwork: "nature.jpg",
        audio: "nature.mp3",
      },
    ],
  },
  {
    name: "Evening Chill",
    creator: 789,
    playtime: 660,
    isActive: true,
    tracklist: [
      {
        name: "Relaxing Dusk",
        album: "Chill Vibes",
        artist: "Mellow Musician",
        duration: 360,
        artwork: "dusk.jpg",
        audio: "dusk.mp3",
      },
      {
        name: "Twilight Melodies",
        album: "Soothing Sounds",
        artist: "Harmony Harmonizer",
        duration: 300,
        artwork: "twilight.jpg",
        audio: "twilight.mp3",
      }
    ],
  }
];

const playlist = {
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

describe('PlaylistService', () => {
  let service: PlaylistService;
  let playlistModel: PlaylistModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistService,
        {
          provide: getModelToken(PlaylistModel),
          useValue: {
            create: jest.fn(() => playlist),
            findAll: jest.fn(() => playlists),
            findOne: jest.fn((id) => {
              if (!playlists[id]) {
                throw new NotFoundException();
              } return playlists[id];
            }),
            update: jest.fn(() => ({ ...playlist, name: 'updated playlist' }))
          }
        }],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
    playlistModel = module.get(getModelToken(PlaylistModel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create playlist.', async () => {
    const result = await service.create(playlist);
    expect(result).toEqual(result);
  });

  it('should get all the playlits.', async () => {
    const result = await service.findAll();
    expect(result).toEqual(playlists);
  });

  it('should get the playlist by id.', async () => {
    const result = await service.findById(1);
    expect(result).toEqual(playlists[1]);
  });

  it('should get error if no playlist found.', async () => {
    const result = await service.findById(6);
    expect(result).toBe(new NotFoundException());
  });
});
