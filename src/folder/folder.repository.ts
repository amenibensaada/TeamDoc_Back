import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './folder.schema';
import { Model } from 'mongoose';
import { createFolderDTOlayer } from './dto/create-folder.dto';

@Injectable()
export class FolderRepository {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async create(foldervalidationlayer: createFolderDTOlayer): Promise<Folder> {
    const createFolder = new this.folderModel(foldervalidationlayer);
    const savedFolder = await createFolder.save();
    // const folderArray: Folder[] = [savedFolder];
    return savedFolder;
  }

  async findAll(): Promise<Folder[]> {
    return this.folderModel.find().exec();
  }

  async findOne(id: string): Promise<Folder> {
    return this.folderModel.findById(id).exec();
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
  async search(Name: string): Promise<Folder> {
    return this.folderModel.findOne({ Name }).exec();
  }


// folder.repository.ts

async findAllSortedByName(order: 'asc' | 'desc'): Promise<Folder[]> {
  const sort = order === 'asc' ? 1 : -1;
  return this.folderModel.find().sort({ Name: sort }).exec();
}



}
