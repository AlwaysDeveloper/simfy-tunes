import { Test, TestingModule } from '@nestjs/testing';
import { TracklistService } from './tracklist.service';

describe('TracklistService', () => {
  let service: TracklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracklistService],
    }).compile();

    service = module.get<TracklistService>(TracklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
