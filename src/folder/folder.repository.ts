import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './folder.schema';
import { Model } from 'mongoose';
import { createFolderDTOlayer } from './dto/create-folder.dto';

@Injectable()
export class FolderRepository {
  folderRepositroy: any;
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  // async create(foldervalidationlayer: createFolderDTOlayer): Promise<Folder> {
  //   const createFolder = new this.folderModel(foldervalidationlayer);
  //   const savedFolder = await createFolder.save();
  //   // const folderArray: Folder[] = [savedFolder];
  //   return savedFolder;
  // }
  async create(newfolder: createFolderDTOlayer, userId: string): Promise<createFolderDTOlayer> {
    const data = Object.assign(newfolder, { user: userId });
    const createFolder = new this.folderModel(data);
    const savedFolder = await createFolder.save();
    return savedFolder;
  }
 // FolderRepository
async search(keyword: string, userId: string, skip: number, perPage: number): Promise<Folder[]> {
  // Utiliser la méthode find du modèle de dossier pour rechercher les dossiers correspondant au mot-clé,
  // à l'ID de l'utilisateur, et inclure la pagination
  const regex = new RegExp(keyword, 'i');
  return this.folderModel.find({ Name: regex, user: userId }).skip(skip).limit(perPage).exec();
}

  


  // async findAll(): Promise<Folder[]> {
  //   return this.folderModel.find().exec();
  // }
  
  // async findAll(skip: number, take: number): Promise<Folder[]> {
  //   console.log(`Fetching folders with skip: ${skip} and take: ${take}`);
  //   return this.folderModel.find().skip(skip).limit(take).exec();
  // }
  
  // async findAll(userId: string): Promise<Folder[]> {
  //   return this.folderModel.find({ user: userId }).exec();
  // }

  async findAll(userId: string,skip: number, take: number): Promise<Folder[]> {
         console.log(`Fetching folders with skip: ${skip} and take: ${take}`);

    return this.folderModel.find({ user: userId }).skip(skip).limit(take).exec();
  }



  

  // async findOne(id: string): Promise<Folder> {
  //   return this.folderModel.findById(id).exec();
  // }
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
}
