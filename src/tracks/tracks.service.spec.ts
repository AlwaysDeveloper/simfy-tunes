import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { getModelToken } from '@nestjs/sequelize';
import { TrackModel } from './track.model';
import { async } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

const trackArray = [
  {
    name: "Track 1",
    album: "Album 1",
    artist: "Artist 1",
    duration: 240, // Duration in mili seconds
    artwork: "track1.jpg",
    audio: "track1.mp3",
  },
  {
    name: "Track 2",
    album: "Album 1",
    artist: "Artist 1",
    duration: 180,
    artwork: "track2.jpg",
    audio: "track2.mp3",
  },
  {
    name: "Track 3",
    album: "Album 2",
    artist: "Artist 2",
    duration: 300,
    artwork: "track3.jpg",
    audio: "track3.mp3",
  },
  {
    name: "Track 4",
    album: "Album 2",
    artist: "Artist 2",
    duration: 210,
    artwork: "track4.jpg",
    audio: "track4.mp3",
  }
];

const singleTrack = {
  name: "Track 5",
  album: "Album 0",
  artist: "Artist 2",
  duration: 210,
  artwork: "track4.jpg",
  audio: "track4.mp3",
}

describe('TracksService', () => {
  let service: TracksService;
  let trackModel: typeof TrackModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracksService,
        {
          provide: getModelToken(TrackModel),
          useValue: {
            create: jest.fn(() => singleTrack),
            findAll: jest.fn(() => trackArray),
            findOne: jest.fn((id) => {
              if (!trackArray[id]) {
                throw new NotFoundException();
              } return trackArray[id];
            }),
            update: jest.fn(() => ({ ...singleTrack, name: 'updated track' }))
          }
        }
      ],
    }).compile();

    service = module.get<TracksService>(TracksService);
    trackModel = module.get<typeof TrackModel>(getModelToken(TrackModel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new track.', async () => {
    const result = await service.create(singleTrack);
    expect(result).toEqual(singleTrack);
  });

  it('should get all the tracks.', async () => {
    const result = await service.findAll();
    expect(result).toEqual(trackArray);
  });

  describe('get track by id.', () => {
    it('should get track by id.', async () => {
      const result = await service.findById(1);
      expect(result).toEqual(trackArray[1]);
    });

    it('should get error if track not found.', async () => { }); it('should get track by id.', async () => {
      const result = await service.findById(6);
      expect(result).toThrowError();
    });
  });
});
