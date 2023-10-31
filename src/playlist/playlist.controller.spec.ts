import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dtos/createPlaylist.dto.';
import { EditPlailistDto } from './dtos/editPlaylist.dto';

const createPlaylist: CreatePlaylistDto = {
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
}

const editPlaylist: EditPlailistDto = {
  name: 'Gym Workout',
  creator: 1,
  playtime: 60,
  isActive: undefined,
  tracklist: undefined
}

describe('PlaylistController', () => {
  let controller: PlaylistController;
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        {
          provide: PlaylistService,
          useValue: {
            create: jest.fn().mockImplementation((playlist: CreatePlaylistDto) => Promise.resolve({ id: 1, ...playlist })),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            edit: jest.fn().mockImplementation((id: number, playlist: EditPlailistDto) => Promise.resolve({ id, ...playlist })),
            remove: jest.fn(),
          }
        }
      ]
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create playlist.', () => {
      const result = controller.create(createPlaylist);
      expect(result).resolves.toEqual({ id: 1, ...createPlaylist });
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(createPlaylist);
    });
  });

  describe('findAll()', () => {
    it('should findAll playlist', () => {
      controller.findAll('', 10, 1);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('find()', () => {
    it('should find playlist by id.', () => {
      controller.findOne(1);
      expect(service.findById).toHaveBeenCalled();
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('edit()', () => {
    it('should edit the playlist.', () => {
      controller.edit(1, editPlaylist);
      expect(service.edit).toHaveBeenCalled();
      expect(service.edit).toHaveBeenCalledWith(1, editPlaylist);
    });
  });

  describe('remove()', () => {
    it('should deactivate the playlist.', () => {
      controller.remove(1);
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
