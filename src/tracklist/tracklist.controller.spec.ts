import { Test, TestingModule } from '@nestjs/testing';
import { TracklistController } from './tracklist.controller';
import { TracklistService } from './tracklist.service';

describe('TracklistController', () => {
  let controller: TracklistController;
  let service: TracklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracklistController],
      providers: [
        {
          provide: TracklistService,
          useValue: {
            create: jest.fn().mockImplementation((playlistId: number, trackId: number) => Promise.resolve({ id: 1, playlistId, trackId, isActive: true })),
            remove: jest.fn().mockImplementation((playlistId: number, trackId: number) => Promise.resolve({ id: 1, playlistId, trackId, isActive: false }))
          }
        }
      ]
    }).compile();

    controller = module.get<TracklistController>(TracklistController);
    service = module.get<TracklistService>(TracklistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create tracklist item i.e add track to playlist', () => {
      const result = controller.create(1, 2);
      expect(result).resolves.toEqual({ id: 1, playlistId: 1, trackId: 2, isActive: true });
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('remove()', () => {
    it('should remove tracklist item i.e remove track to playlist', () => {
      const result = controller.remove(1, 2);
      expect(result).resolves.toEqual({ id: 1, playlistId: 1, trackId: 2, isActive: false });
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(1, 2);
    });
  });
});
