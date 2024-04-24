import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { Folder } from 'src/folder/folder.schema';
import { Content } from 'src/content/content.schema';

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectModel(Documents.name) private DocumentsModel: Model<Documents>,
    @InjectModel(Folder.name) private FolderModel: Model<Folder>,
    @InjectModel(Content.name) private ContentModel: Model<Content>
  ) {}

  //Simple Create of documents
  async create(documentsvalidationlayer: createDocumentsDTOlayer): Promise<Documents> {
    const createDocuments = new this.DocumentsModel(documentsvalidationlayer);

    const savedDocuments = await createDocuments.save();
    await this.ContentModel.create({
      documentId: savedDocuments._id,
      content:
        '{"time":1709913974033,"blocks":[{"id":"QGDNsHbom1","type":"header","data":{"text":"This is my awesome editor!","level":1}}],"version":"2.29.0"}',
      creationDate: new Date()
    });

    return savedDocuments;
  }
  async createWithFolderId(
    folderId: string,
    documentsValidationLayer: createDocumentsDTOlayer
  ): Promise<Documents> {
    const createDocuments = new this.DocumentsModel({
      ...documentsValidationLayer,
      folderId: folderId 
    });
  
    const savedDocuments = await createDocuments.save();
  
    await this.ContentModel.create({
      documentId: savedDocuments._id,
      content:
        '{"time":1709913974033,"blocks":[{"id":"QGDNsHbom1","type":"header","data":{"text":"This is my awesome editor!","level":1}}],"version":"2.29.0"}',
      creationDate: new Date()
    });
  
    return savedDocuments;
  }
  

 
  async findAll(): Promise<Documents[]> {
    return this.DocumentsModel.find().exec();
  }
  // findAlldocumentsbyfolder
  async findByFolderId(folderId: string): Promise<Documents[]> {
    return this.DocumentsModel.find({ folderId }).exec();
  }
  
  async findOne(id: string): Promise<Documents> {
    return this.DocumentsModel.findById(id).exec();
  }

  async update(id: string, updateFolderDto: any) {
    return this.DocumentsModel.findByIdAndUpdate(id, updateFolderDto, {
      new: true
    }).exec();
  }

  async remove(id: string): Promise<Documents> {
    return this.DocumentsModel.findByIdAndDelete(id).exec();
  }

  
}
