import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentCrudService } from './document-crud.service';
import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document-crud.dto';

@Controller('document-crud')
export class DocumentCrudController {
  constructor(private readonly DocService: DocumentCrudService) {}
  @Get()
  async findAll(): Promise<Documents[]> {
    return this.DocService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Documents> {
    return this.DocService.findOne(+id);
  } 

  @Post()
  async create(
    @Body() Documentsvalidator: createDocumentsDTOlayer,
  ): Promise<Documents> {
    return this.DocService.create(Documentsvalidator);
  }

 

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedocuDto: createDocumentsDTOlayer,
  ): Promise<Documents> {
    return this.DocService.update(+id, updatedocuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Documents> {
    return this.DocService.remove(+id);
  }
}
