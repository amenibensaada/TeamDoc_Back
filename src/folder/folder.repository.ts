  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Folder } from './folder.schema';
  import { Model } from 'mongoose';
  import { createFolderDTOlayer } from './dto/create-folder.dto';

  @Injectable()
  export class FolderRepository {
    folderRepositroy: any;
    constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  
    async create(newfolder: createFolderDTOlayer, userId: string): Promise<createFolderDTOlayer> {
      const data = Object.assign(newfolder, { user: userId });
      const createFolder = new this.folderModel(data);
      const savedFolder = await createFolder.save();
      return savedFolder;
    }

  async search(keyword: string, userId: string, skip: number, perPage: number): Promise<Folder[]> {
    
    const regex = new RegExp(keyword, 'i');
    return this.folderModel.find({ Name: regex, user: userId }).skip(skip).limit(perPage).exec();
  }


    async findAll(userId: string,skip: number, take: number): Promise<Folder[]> {
          console.log(`Fetching folders with skip: ${skip} and take: ${take}`);

      return this.folderModel.find({ user: userId }).skip(skip).limit(take).exec();
    }

    
    async findOne(id: string, userId: string): Promise<Folder> {
      return this.folderModel.findById({ _id: id, user: userId }).exec();
    }

    async update(id: string, updateFolderDto: any) {
      return this.folderModel
        .findByIdAndUpdate(id, updateFolderDto, {
          new: true
        })
        .exec();
    }

    async remove(id: string): Promise<Folder> {
      return this.folderModel.findByIdAndDelete(id).exec();
    }
    async findById(id: string): Promise<Folder> {
      return this.folderModel.findById(id).exec();
    }
    async getSharedFoldersForUser(userId: string): Promise<Folder[]> {
      console.log(`Fetching shared folders for user with ID: ${userId}`);
      
      const sharedFolders = await this.folderModel
        .find({ sharedWith: userId })
        .exec();
    
        console.log('Shared folders found:', sharedFolders);

      return sharedFolders;

    }
    async ignoreAccess(folderId: string, userIdToIgnore: string): Promise<Folder> {
  const folder = await this.findById(folderId);
  if (!folder) {
    throw new NotFoundException('Folder not found');
  }

  // Vérifiez d'abord si l'utilisateur à ignorer existe dans la liste des utilisateurs partagés
  const userIndex = folder.sharedWith.findIndex(user => user.toString() === userIdToIgnore);
  if (userIndex === -1) {
    throw new NotFoundException('User to ignore not found in shared users');
  }

  // Supprimer l'utilisateur de la liste des utilisateurs partagés
  folder.sharedWith.splice(userIndex, 1);

  // Mettez à jour le document dans la base de données
  const updatedFolder = await this.folderModel.findByIdAndUpdate(folderId, folder, { new: true }).exec();
  if (!updatedFolder) {
    throw new NotFoundException('Failed to update folder');
  }

  return updatedFolder;
}

    
    



    
    
  
    
  }
