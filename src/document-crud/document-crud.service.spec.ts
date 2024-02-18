import { Test, TestingModule } from '@nestjs/testing';
import { DocumentCrudService } from './document-crud.service';

describe('DocumentCrudService', () => {
  let service: DocumentCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentCrudService],
    }).compile();

    service = module.get<DocumentCrudService>(DocumentCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
