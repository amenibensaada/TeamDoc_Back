import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  Put,
  UseGuards,
  Req
} from '@nestjs/common';
import { Documents } from './document.schema';
import { createDocumentsDTOlayer } from './dto/create-document.dto';
import { DocumentService } from './document.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from '@nestjs/passport';

@Controller('Document')
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
  constructor(private readonly DocService: DocumentService) {}

  @Get('getalldocuments')
  async findAll(@Req() req): Promise<Documents[]> {
    const userId = req.user.id;

    return this.DocService.findAll(userId);
  }

  @Get('getbyiddocuments/:id')
  async findOne(@Param('id') id: string, @Req() req): Promise<Documents> {
    const userId = req.user.id;

    return this.DocService.findOne(id, userId);
  }
  


  @Put('updatedocuments/:id')
  @UsePipes(ZodValidationPipe)

  async update(
    @Param('id') id: string,
    @Body() updatedocuDto: createDocumentsDTOlayer,
    @Req() req
  ): Promise<Documents> {
    const userId = req.user.id;

    return this.DocService.update(id, updatedocuDto, userId);
  }

  @Delete('deletedocuments/:id')
  async remove(@Param('id') id: string, @Req() req): Promise<Documents> {
    const userId = req.user.id;

    return this.DocService.remove(id, userId);
  }



  @Post('AddDocuments')
  @UsePipes(ZodValidationPipe)

  async create(
    @Body() Documentsvalidator: createDocumentsDTOlayer,
    @Req() req
  ): Promise<Documents> {
    const userId = req.user.id;

    return this.DocService.create(Documentsvalidator, userId);
  }

  @Post('/createavecaffectation/:idfol')
  @UsePipes(ZodValidationPipe)

  async createavecsaffection(
    @Body() Documentsvalidator: createDocumentsDTOlayer, 
    @Param('idfol') idfol: string,
    @Req() req
  ): Promise<Documents> {
    const userId = req.user.id;

    return this.DocService.createavecaffectation(idfol, Documentsvalidator, userId);
  }

 

 



 // @Post('/createDocandfolder/:folderName')
  // @UsePipes(ZodValidationPipe)

  // async createDocandfolder(
  //   @Body() Documentsvalidator: createDocumentsDTOlayer,
  //   @Param('folderName') folderName: string
  // ): Promise<Documents> {
  //   return this.DocService.createDocandfolder(Documentsvalidator, folderName);
  // }


}
