import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
@Controller('Document')
export class DocumentController {
  constructor(private readonly DocService: DocumentService) {}



  @Get()
  async findAll(): Promise<Documents[]> {
    return this.DocService.findAll();
  }

  
  @Get('/documents/:folderId')
  async findAllDoumentByFolderId(@Param('folderId') folderId: string): Promise<Documents[]> {
    return this.DocService.findByFolderId(folderId);
  }



  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Documents> {
    return this.DocService.findOne(id);
  }

  @Post()
  async create(@Body() Documentsvalidator: createDocumentsDTOlayer): Promise<Documents> {
    return this.DocService.create(Documentsvalidator);
  }
  @Post(':folderId')
  async createDocument(
    @Param('folderId') folderId: string,
    @Body() documentsValidationLayer: createDocumentsDTOlayer
  ): Promise<Documents> {
    return this.DocService.createWithFolderId(folderId, documentsValidationLayer);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedocuDto: createDocumentsDTOlayer
  ): Promise<Documents> {
    return this.DocService.update(id, updatedocuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Documents> {
    return this.DocService.remove(id);
  }
}
