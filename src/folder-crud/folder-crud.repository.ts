import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './folder.schema';
import { Model } from 'mongoose';
import { createFolderDTOlayer } from './dto/create-folder-crud.dto';



@Injectable()
export class FolderCrudRepository {
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

  async findOne(id: number): Promise<Folder> {
    return this.folderModel.findById(id).exec();
  }

  async update(id: number, updateFolderDto: any) {
    return this.folderModel
      .findByIdAndUpdate(id, updateFolderDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: number): Promise<Folder> {
    return this.folderModel.findByIdAndDelete(id).exec();
}


}
