import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Folder } from './folder.schema';
import { createFolderDTOlayer } from './dto/create-folder.dto';
import { FolderService } from './folder.service';


@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) { }
  @Get()
  async findAll(): Promise<Folder[]> {
    return this.folderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Folder> {
    return this.folderService.findOne(+id);
  }

  @Post()
  async create(@Body() createFolderDto: createFolderDTOlayer): Promise<Folder> {
    return this.folderService.create(createFolderDto);
  }



  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFolderDto: createFolderDTOlayer,
  ): Promise<Folder> {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Folder> {
    return this.folderService.remove(+id);
  }
}