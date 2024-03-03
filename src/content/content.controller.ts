import { Body, Controller, Get, Post } from '@nestjs/common';
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
  @Get('last')
  async getLastContent(): Promise<Content> {
    return this.contentService.getLastContent();
  }
}
