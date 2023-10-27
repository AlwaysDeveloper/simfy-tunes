import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from './playlist.service';
import { PlaylistModel } from './playlist.model';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let playlistModel: PlaylistModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistService],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
