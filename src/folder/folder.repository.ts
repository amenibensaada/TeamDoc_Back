import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './folder.schema';
import { Model } from 'mongoose';
import { createFolderDTOlayer } from './dto/create-folder.dto';

@Injectable()
export class FolderRepository {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async create(newfolder: createFolderDTOlayer, userId: string): Promise<createFolderDTOlayer> {
    const data = Object.assign(newfolder, { user: userId });
    const createFolder = new this.folderModel(data);
    const savedFolder = await createFolder.save();
    return savedFolder;
  }

  async findAll(userId: string): Promise<Folder[]> {
    return this.folderModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Folder> {
    return this.folderModel.findById({ _id: id, user: userId }).exec();
  }

  async update(id: string, userId: string, updateFolderDto: any) {
    return this.folderModel
      .findByIdAndUpdate(
        id,
        { ...updateFolderDto, user: userId },
        {
          new: true
        }
      )
      .exec();
  }

  async removeonefolder(id: string, userId: string): Promise<Folder> {
    return this.folderModel.findByIdAndDelete({ _id: id, user: userId }).exec();
  }




  async removeSelected(folderIds: string[]): Promise<Folder[]> {
    try {
      const foldersToRemove = await this.folderModel.find({ _id: { $in: folderIds } });

      await this.folderModel.deleteMany({ _id: { $in: folderIds } });
      return foldersToRemove;
    } catch (error) {
      throw new Error(`Error removing documents: ${error.message}`);
    }
  }
}
