import { Injectable } from '@nestjs/common';
import { Folder } from './folder.schema';
import { FolderCrudRepository } from './folder-crud.repository';


@Injectable()
export class FolderCrudService {
  constructor(private folderRepositroy: FolderCrudRepository) {}

  async findAll() {
    return this.folderRepositroy.findAll();
  }

  async findOne(id: number) {
    return this.folderRepositroy.findOne(id);
  }



  async create(createFolderDto: any): Promise<Folder> {
    return this.folderRepositroy.create(createFolderDto);
  }

 

  async update(id: number, updateFolderDto: any) {
    return this.folderRepositroy.update(id, updateFolderDto);
  }

  async remove(id: number) {
    return this.folderRepositroy.remove(id);
  }
}
