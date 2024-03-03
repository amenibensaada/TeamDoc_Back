import { Injectable } from '@nestjs/common';
import { Content } from './content.schema';
import { ContentRepository } from './content.repository';
import { createContentDTO } from './dto/create-content-dto';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async createContent(createContent: createContentDTO): Promise<Content> {
    return this.contentRepository.create(createContent);
  }
  async getLastContent(): Promise<Content> {
    const lastContent = await this.contentRepository.findOne();
    return lastContent;
  }
}
