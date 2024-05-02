import { Injectable } from '@nestjs/common';
import { Documents } from './document.schema';
import { DocumentsRepository } from './document.repository';
import { FolderRepository } from '../folder/folder.repository';
import { Folder } from 'src/folder/folder.schema';

@Injectable()
export class DocumentService {
  constructor(
    private DocRepositroy: DocumentsRepository,
    private folderRepository: FolderRepository
  ) {}

  async findAll() {
    return this.DocRepositroy.findAll();
  }
  async findByFolderId(folderId: string): Promise<Documents[]> {
    return this.DocRepositroy.findByFolderId(folderId);
  }

  async findOne(id: string) {
    return this.DocRepositroy.findOne(id);
  }

  async create(createDocValidator: any): Promise<Documents> {
    return this.DocRepositroy.create(createDocValidator);
  }

  async createWithFolderId(folderId: string, createDocValidator: any): Promise<Documents> {
    return this.DocRepositroy.createWithFolderId(folderId, createDocValidator);
  }

  async update(id: string, createDocValidator: any) {
    return this.DocRepositroy.update(id, createDocValidator);
  }

  async remove(id: string) {
    return this.DocRepositroy.remove(id);
  }
  async findFolderById(id: string): Promise<Folder> {
    return this.folderRepository.findById(id);
  }
  async archivePost(id: number): Promise<Documents> {
    return this.DocRepositroy.archivePost(id);
  }
  async archivede(id: number): Promise<Documents> {
    return this.DocRepositroy.archivede(id);
  }
}
