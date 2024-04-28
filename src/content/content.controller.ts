import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createContentDTO } from './dto/create-content-dto';
import { ContentService } from './content.service';
import { Content } from './content.schema';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}


  @Post()
  async create(@Body() Contentsvalidator: createContentDTO) {
    return this.contentService.createContent(Contentsvalidator);
  }

  @Get('/:id/last')
  async getLastContent(@Param('id') id: string): Promise<Content> {
    return this.contentService.getLastContent(id);
  }
  @Get()
  async getAllContents() {
    return this.contentService.getAllContentst();
  }
  @Put('/:id/update-real-time')
  async updateContentRealTime(@Param('id') id: string, @Body() updateContentDTO: any) {
    // Supposons que updateContentDTO contient le nouveau contenu à mettre à jour
    const updatedContent = await this.contentService.updateContentRealTime(id, updateContentDTO.content);
    return updatedContent;
}
}
