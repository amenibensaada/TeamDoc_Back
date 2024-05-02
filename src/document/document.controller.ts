import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Folder } from 'src/folder/folder.schema';
@Controller('Document')
export class DocumentController {
  constructor(private readonly DocService: DocumentService) {}

  @Post('/dearchive/:id')
  async archivedea(@Param('id') id: number) {
    return this.DocService.archivede(id);
  }

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
  @Put('/archive/:id')
  async archivePost(@Param('id') id: number) {
    return this.DocService.archivePost(id);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Documents> {
    return this.DocService.remove(id);
  }
  @Get('folder/:folderId')
  async getFolderById(@Param('folderId') folderId: string): Promise<Folder | null> {
    return this.DocService.findFolderById(folderId);
  }
}
