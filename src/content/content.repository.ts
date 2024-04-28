import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createContentDTO } from './dto/create-content-dto';
import { Content } from './content.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContentRepository {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) {}

  async create(contentvalidation: createContentDTO): Promise<Content> {
    const createContent = new this.contentModel(contentvalidation);
    const savedContent = await createContent.save();
    return savedContent;
  }
  async findLast(id: string): Promise<Content> {
    const filter = { documentId: id };
    const defaultOptions = { sort: { creationDate: -1 } };
    return this.contentModel.findOne(filter, null, defaultOptions).exec();
  }

  async findAll() {
    const contents = await this.contentModel.find().exec();
    return contents;
  }
  async updateContentById(id: string, updatedContent: string): Promise<Content | undefined> {
    const updatedContentResult = await this.contentModel.findByIdAndUpdate(id, { content: updatedContent }, { new: true });
    return updatedContentResult;
  }

  async findOneById(id: string): Promise<Content | undefined> {
    return this.contentModel.findById(id).exec();
  }
}
