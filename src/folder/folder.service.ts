import { Injectable } from '@nestjs/common';
import { Folder } from './folder.schema';
import { FolderRepository } from './folder.repository';
import { createFolderDTOlayer } from './dto/create-folder.dto';


@Injectable()
export class FolderService {
  constructor(private folderRepository: FolderRepository) {}

  
  async findAll(userId: string, page: number = 1, perPage: number = 3): Promise<Folder[]> {
    const skip = Math.max(0, (page - 1) * perPage); // Assurez-vous que skip est au moins égal à 0
    console.log(`Fetching folders for user ${userId}, page: ${page}, and perPage: ${perPage}`);
    return this.folderRepository.findAll(userId, skip, perPage);
}

  

async search(keyword: string, userId: string, page: number, perPage: number): Promise<Folder[]> {
  const skip = (page - 1) * perPage;

  
  return this.folderRepository.search(keyword, userId, skip, perPage);
}

 
  async findOne(id: string, userId: string) {
    return this.folderRepository.findOne(id, userId);
  }

  
  async create(createFolderDto: createFolderDTOlayer, user: string): Promise<createFolderDTOlayer> {
    return this.folderRepository.create(createFolderDto, user);
  }

  async update(id: string, updateFolderDto: any) {
    return this.folderRepository.update(id, updateFolderDto);
  }

  async remove(id: string) {
    return this.folderRepository.remove(id);
  }
}
