import { Injectable } from '@nestjs/common';
import { Folder } from './folder.schema';
import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
 
  
  constructor(private folderRepositroy: FolderRepository) {}

  async findAll() {
    return this.folderRepositroy.findAll();
  }

  async findOne(id: string) {
    return this.folderRepositroy.findOne(id);
  }

  async create(createFolderDto: any): Promise<Folder> {
    return this.folderRepositroy.create(createFolderDto);
  }

  async update(id: string, updateFolderDto: any) {
    return this.folderRepositroy.update(id, updateFolderDto);
  }

  async remove(id: string) {
    return this.folderRepositroy.remove(id);
  }

  async searchByName(Name : string){
    return this.folderRepositroy.search(Name);

  }

 // folder.service.ts

async filter(order: 'asc' | 'desc'): Promise<Folder[]> {
  return this.folderRepositroy.findAllSortedByName(order);
}




  
}
