import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { Folder } from 'src/folder/folder.schema';

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectModel(Documents.name) private DocumentsModel: Model<Documents>,
    @InjectModel(Folder.name) private FolderModel: Model<Folder>
  ) {}

   // find avec auth 

  async findAll(userId: string): Promise<Documents[]> {
    return this.DocumentsModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Documents> {
    return this.DocumentsModel.findById({ _id: id, user: userId }).exec();
  }

  async update(id: string, updateFolderDto: any, userId: string) {
    const currentDate = new Date();
    return this.DocumentsModel.findByIdAndUpdate(
      id,
      { ...updateFolderDto, user: userId, updatedDate: currentDate },
      {
        new: true
      }
    ).exec();
  }

  async remove(id: string, userId: string): Promise<Documents> {
    return this.DocumentsModel.findByIdAndDelete({ _id: id, user: userId }).exec();
  }

  //Simple Create of documents
  async create(
    documentsvalidationlayer: createDocumentsDTOlayer,
    userId: string
  ): Promise<Documents> {
    const data = Object.assign(documentsvalidationlayer, { user: userId });

    const createDocuments = new this.DocumentsModel(data);
    const savedDocuments = await createDocuments.save();
    // const folderArray: Folder[] = [savedFolder];
    return savedDocuments;
  }
  
  async createavecaffectation(
    folderId: string,
    documentsvalidationlayer: createDocumentsDTOlayer,
    userId: string
  ): Promise<Documents> {
    const findFolder = await this.FolderModel.findById(folderId);
    if (!findFolder) return null;
    const data = Object.assign(documentsvalidationlayer, { user: userId, folders: folderId });

    const createDocuments = new this.DocumentsModel(data);
    const savedDocuments = await createDocuments.save();
    await findFolder.updateOne({
      $push: {
        documents: savedDocuments.id
      }
    });
    return savedDocuments;
  }

 




 

 
 // async createDocandfolder(
  //   documentsValidationLayer: createDocumentsDTOlayer,
  //   folderName: string
  // ): Promise<Documents> {

  //   const findFolder = await this.FolderModel.create({ Name: folderName });
  //   const savedDocuments = await this.DocumentsModel.create({
  //     ...documentsValidationLayer,
  //     folder: findFolder
  //   });
  //   await this.FolderModel.findByIdAndUpdate(findFolder._id, {
  //     $push: {
  //       documents: savedDocuments
  //     }
  //   });

  //   return savedDocuments;
  // }

 
}
