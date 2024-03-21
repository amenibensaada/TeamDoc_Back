import { Injectable } from '@nestjs/common';
import { FolderRepository } from './folder.repository';
import { createFolderDTOlayer } from './dto/create-folder.dto';
import { User } from 'src/users/users.schema';

@Injectable()
export class FolderService {
  constructor(private folderRepositroy: FolderRepository) {}

  async findAll(userId: string) {
    return this.folderRepositroy.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    return this.folderRepositroy.findOne(id, userId);
  }

  async create(createFolderDto: createFolderDTOlayer, user: string): Promise<createFolderDTOlayer> {
    return this.folderRepositroy.create(createFolderDto, user);
  }
  

  async update(id: string, userId: string, updateFolderDto: any) {
    return this.folderRepositroy.update(id, userId, updateFolderDto);
  }

  async removeonefolder(id: string, userId: string) {
    return this.folderRepositroy.removeonefolder(id, userId);
  }
  //remove all 
  async removeSelected(folderIds: string[]) {
    return this.folderRepositroy.removeSelected(folderIds);
  }
}
