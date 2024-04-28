import { Injectable } from '@nestjs/common';
import { Content } from './content.schema';

import { createContentDTO } from './dto/create-content-dto';
import { RealTimeService } from 'src/real-time/real-time.service';
import { ContentRepository } from './content.repository';

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository , 
    private readonly realTimeService: RealTimeService
  ) {}
  
  

  async createContent(createContent: createContentDTO): Promise<Content> {
    return this.contentRepository.create(createContent);
  }
  async getLastContent(id: string): Promise<Content> {
    const lastContent = await this.contentRepository.findLast(id);
    return lastContent;
  }
  async getAllContentst() {
    const contents = await this.contentRepository.findAll();
    return contents;
  }
  async updateContentRealTime(id: string, updatedContent: string): Promise<Content | undefined> {
    const updated = await this.contentRepository.updateContentById(id, updatedContent);
    if (updated) {
      this.realTimeService.emitContentUpdate (id, updatedContent);
    }
    return updated;
  }
}
