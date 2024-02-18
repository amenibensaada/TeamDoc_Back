import { Test, TestingModule } from '@nestjs/testing';
import { FolderCrudController } from './folder-crud.controller';
import { FolderCrudService } from './folder-crud.service';

describe('FolderCrudController', () => {
  let controller: FolderCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FolderCrudController],
      providers: [FolderCrudService],
    }).compile();

    controller = module.get<FolderCrudController>(FolderCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
