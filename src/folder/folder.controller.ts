  import { Controller, Get, Post, Body, Patch, Param, Delete , Query ,Req,  UseGuards} from '@nestjs/common';
  import { Folder } from './folder.schema';
  import { createFolderDTOlayer } from './dto/create-folder.dto';
  import { FolderService } from './folder.service';
  import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

 
  @Controller('folder')
  @UseGuards(AuthGuard('jwt'))

  export class FolderController {
    constructor(private readonly folderService: FolderService) {}
    
    @Get('search')
async search(
  @Req() req,
  @Query('keyword') keyword: string,
  @Query('page') page: number,
  @Query('perPage') perPage: number,
): Promise<Folder[]> {
  const userId = req.user.id;
  return this.folderService.search(keyword, userId, page, perPage);
}

    
    @Get('getAllFolder')
    async findAll(
      @Req() req,
      @Query('page') page: number = 1,
      @Query('perPage') perPage: number = 3 
    ): Promise<Folder[]> {
      const userId = req.user.id;
      return this.folderService.findAll(userId, page, perPage);
    }
    
    @Post('/AddFolder')
  async create(
    @Body() createFolderDto: createFolderDTOlayer,
    @Req() req
  ): Promise<createFolderDTOlayer> {
    console.log(req.user.id);
    return this.folderService.create(createFolderDto, req.user.id);

    
  }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateFolderDto: createFolderDTOlayer
    ): Promise<Folder> {
      console.log('Updating folder:', id, updateFolderDto);

      return this.folderService.update(id, updateFolderDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Folder> {
      return this.folderService.remove(id);
    }
  
    @Get('getbyidfolder/:id')
    async findOne(@Param('id') id: string, @Req() req): Promise<Folder> {
      const userId = req.user.id;
      console.log(userId);
      return this.folderService.findOne(id, userId);
    }
    


}
  
  
