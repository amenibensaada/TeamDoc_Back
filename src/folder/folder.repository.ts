  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Folder } from './folder.schema';
  import { Model } from 'mongoose';
  import { createFolderDTOlayer } from './dto/create-folder.dto';

@Injectable()
export class FolderRepository {
  folderRepositroy: any;
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Folder.name) private documentModel: Model<Document>
  ) {}

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

  async findAll(userId: string, skip: number, take: number): Promise<Folder[]> {
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

const userIndex = folder.sharedWith.findIndex(user => user.toString() === userIdToIgnore);
if (userIndex === -1) {
  throw new NotFoundException('User to ignore not found in shared users');
}

folder.sharedWith.splice(userIndex, 1);

const updatedFolder = await this.folderModel.findByIdAndUpdate(folderId, folder, { new: true }).exec();
if (!updatedFolder) {
  throw new NotFoundException('Failed to update folder');
}

return updatedFolder;
}

async aggregateFolderCreationData(): Promise<{ date: Date, folderCount: number }[]> {
  return this.folderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdDate' } },
        folderCount: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: { $toDate: '$_id' },
        folderCount: 1
      }
    }
  ]);
}

async getSharedFolderCount(): Promise<{ folderName: string, shareCount: number }[]> {
  const sharedFolders = await this.folderModel.aggregate([
    {
      $match: {
        sharedWith: { $exists: true, $ne: [] } // Filtrer les documents avec le champ sharedWith non vide
      }
    },
    {
      $project: {
        Name: 1, // Inclure le champ Name dans le résultat
        shareCount: { $size: "$sharedWith" }
      }
    }
  ]);

  return sharedFolders.map(folder => ({
    folderName: folder.Name,
    shareCount: folder.shareCount
  }));
}


}
