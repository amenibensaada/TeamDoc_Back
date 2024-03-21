import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('Document')
export class DocumentController {
  constructor(private readonly DocService: DocumentService) {}

  @Get('getalldocuments')
  async findAll(): Promise<Documents[]> {
    return this.DocService.findAll();
  }

  @Get('getbyiddocuments/:id')
  async findOne(@Param('id') id: string): Promise<Documents> {
    return this.DocService.findOne(id);
  }
  
  @Post('AddDocuments')
  @UsePipes(ZodValidationPipe)

  async create(@Body() Documentsvalidator: createDocumentsDTOlayer): Promise<Documents> {
    return this.DocService.create(Documentsvalidator);
  }

  @Post('/createavecaffectation/:idfol')
  @UsePipes(ZodValidationPipe)

  async createavecsaffection(
    @Body() Documentsvalidator: createDocumentsDTOlayer, 
    @Param('idfol') idfol: string
  ): Promise<Documents> {
    return this.DocService.createavecaffectation(idfol, Documentsvalidator);
  }

  @Post('/createDocandfolder/:folderName')
  @UsePipes(ZodValidationPipe)

  async createDocandfolder(
    @Body() Documentsvalidator: createDocumentsDTOlayer,
    @Param('folderName') folderName: string
  ): Promise<Documents> {
    return this.DocService.createDocandfolder(Documentsvalidator, folderName);
  }

  @Patch('updatedocuments/:id')
  @UsePipes(ZodValidationPipe)

  async update(
    @Param('id') id: string,
    @Body() updatedocuDto: createDocumentsDTOlayer
  ): Promise<Documents> {
    return this.DocService.update(id, updatedocuDto);
  }

  @Delete('deletedocuments/:id')
  async remove(@Param('id') id: string): Promise<Documents> {
    return this.DocService.remove(id);
  }

}
