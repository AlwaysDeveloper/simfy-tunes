import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dtos/createTrack.dto';

describe('TracksController', () => {
  let controller: TracksController;
  let service: TracksService;

  const track: CreateTrackDto = {
    name: 'sarkaree',
    album: 'new life',
    artist: 'King',
    duration: 180,
    artwork: 'http://www.king.com',
    audio: 'http://www.king.com'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [
        {
          provide: TracksService,
          useValue: {
            create: jest.fn().mockImplementation((track: CreateTrackDto) => Promise.resolve({ id: 1, ...track })),
            findAll: jest.fn().mockResolvedValue([track]),
            find: jest.fn().mockResolvedValue(track),
            edit: jest.fn().mockImplementation((id: number, track: CreateTrackDto) => Promise.resolve({ ...track }))
          }
        }
      ]
    }).compile();

    controller = module.get<TracksController>(TracksController);
    service = module.get<TracksService>(TracksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create track.', () => {
      const result = controller.create(track);
      expect(result).resolves.toEqual({ id: 1, ...track });
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(track);
    });
  });

  describe('findAll()', () => {
    it('should find alll tracks', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should find track by id.', () => {
      controller.find(1);
      expect(service.findById).toHaveBeenCalled();
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('edit()', () => {
    it('shoudl have edit the track.', () => {
      controller.edit(1, track);
      expect(service.edit).toHaveBeenCalled();
      expect(service.edit).toHaveBeenCalledWith(1, track);
    });
  })
});
