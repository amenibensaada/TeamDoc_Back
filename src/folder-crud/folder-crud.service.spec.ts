import { Test, TestingModule } from '@nestjs/testing';
import { FolderCrudService } from './folder-crud.service';

describe('FolderCrudService', () => {
  let service: FolderCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolderCrudService],
    }).compile();

    service = module.get<FolderCrudService>(FolderCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
