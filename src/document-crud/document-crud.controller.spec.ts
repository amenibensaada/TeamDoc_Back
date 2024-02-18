import { Test, TestingModule } from '@nestjs/testing';
import { DocumentCrudController } from './document-crud.controller';
import { DocumentCrudService } from './document-crud.service';

describe('DocumentCrudController', () => {
  let controller: DocumentCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentCrudController],
      providers: [DocumentCrudService],
    }).compile();

    controller = module.get<DocumentCrudController>(DocumentCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
