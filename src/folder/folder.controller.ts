import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Req,
  UseGuards,
  Put
} from '@nestjs/common';
import { Folder } from './folder.schema';
import { createFolderDTOlayer } from './dto/create-folder.dto';
import { FolderService } from './folder.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('folder')
@UseGuards(AuthGuard('jwt'))

export class FolderController {
  constructor(private readonly folderService: FolderService) {}


  //get
  @Get('getAllFolder')
  async findAll(@Req() req): Promise<Folder[]> {
    const userId = req.user.id;
    return this.folderService.findAll(userId);
  }
//getbyid
  @Get('getbyidfolder/:id')
  async findOne(@Param('id') id: string, @Req() req): Promise<Folder> {
    const userId = req.user.id;

    return this.folderService.findOne(id, userId);
  }
  //Add with authentification 
  @Post('/AddFolder')
  @UsePipes(ZodValidationPipe)
  async create(
    @Body() createFolderDto: createFolderDTOlayer,
    @Req() req
  ): Promise<createFolderDTOlayer> {
    console.log(req.user.id);
    return this.folderService.create(createFolderDto, req.user.id);

    
  }
//update
  @Put('updateFolder/:id')
  @UsePipes(ZodValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updateFolderDto: createFolderDTOlayer,
    @Req() req
  ): Promise<Folder> {
    const userId = req.user.id;

    return this.folderService.update(id, userId, updateFolderDto);
  }




///delete 
  @Delete('deleteFolder/:id')
  async remove(@Param('id') id: string, @Req() req): Promise<Folder> {
    const userId = req.user.id;

    return this.folderService.removeonefolder(id, userId );
  }
   





  
  @Delete('remove-selected')
  // @HttpCode(HttpStatus.NO_CONTENT)
  async removeSelected(@Body() data: { documentIds: string[] }): Promise<Folder[]> {
    return await this.folderService.removeSelected(data.documentIds);
  }
  
}
