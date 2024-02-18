import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { Folder } from 'src/folder/folder.schema';



@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectModel(Documents.name) private DocumentsModel: Model<Documents>,
    @InjectModel(Folder.name) private FolderModel: Model<Folder>,
  ) {}

  async create(
    {folderId,
    ...documentsvalidationlayer
  }: createDocumentsDTOlayer): Promise<Documents> {
    const findFolder = await this.FolderModel.findById(folderId);
    if (!findFolder) return null;
    const createDocuments = new this.DocumentsModel(documentsvalidationlayer);
    const savedDocuments = await createDocuments.save();
     await findFolder.updateOne({
      $push: {
        documents: savedDocuments.id,
      }
     })


    // const folderArray: Folder[] = [savedFolder];
    return savedDocuments;
  }

  async findAll(): Promise<Documents[]> {
    return this.DocumentsModel.find().exec();
  }

  async findOne(id: number): Promise<Documents> {
    return this.DocumentsModel.findById(id).exec();
  }

  async update(id: number, updateFolderDto: any) {
    return this.DocumentsModel.findByIdAndUpdate(id, updateFolderDto, {
      new: true,
    }).exec();
  }

  async remove(id: number): Promise<Documents> {
    return this.DocumentsModel.findByIdAndDelete(id).exec();
  }
}
