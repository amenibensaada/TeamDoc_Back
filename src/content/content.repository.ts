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
  async findOne(filter = {}, options = {}): Promise<Content> {
    const defaultOptions = { sort: { date: 1 } };
    const mergedOptions = { ...defaultOptions, ...options };

    return this.contentModel.findOne(filter, null, mergedOptions).exec();
  }
}
