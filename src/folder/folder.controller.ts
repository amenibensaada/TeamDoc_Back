  import { Controller, Get, Post, Body, Patch, Param, Delete , Query ,Req,  UseGuards, NotFoundException} from '@nestjs/common';
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
  @Get('shared')
async getSharedFolders(@Req() req): Promise<Folder[]> {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId); 

   const sharedFolders = await this.folderService.getSharedFoldersForUser(userId);
    console.log("Shared Folders:", sharedFolders); 

    return sharedFolders;
  } catch (error) {
    console.error("Error fetching shared folders:", error.message);
    throw error;
  }
}


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFolderDto: createFolderDTOlayer
  ): Promise<Folder> {
    console.log('Updating folder:', id, updateFolderDto);

    return this.folderService.update(id, updateFolderDto);
  }


  // @Delete('remove-selected')
  // async removeSelected(@Body('folderIds') folderIds: string[]): Promise<Folder[]> {
  //   return await this.folderService.removeSelected(folderIds);
  // }


    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Folder> {
      return this.folderService.remove(id);
    }
    @Post(':id/share')
    async shareFolder(@Param('id') id: string, @Body('userIdToShareWith') userIdToShareWith: string) {
      return this.folderService.shareFolder(id, userIdToShareWith);
    }
    
    
    @Get('getbyidfolder/:id')
    async findOne(@Param('id') id: string, @Req() req): Promise<Folder> {
      const userId = req.user.id;
      console.log(userId);
      return this.folderService.findOne(id, userId);
    }

    @Delete(':folderId/ignore-access/:userIdToIgnore')
    async ignoreAccess(@Param('folderId') folderId: string, @Param('userIdToIgnore') userIdToIgnore: string) {
      console.log('Folder ID:', folderId);
      console.log('User ID to ignore:', userIdToIgnore);
      return this.folderService.ignoreAccess(folderId, userIdToIgnore);
    }
    @Get('folder-creation-data')
  async getFolderCreationData(): Promise<{ date: Date, folderCount: number }[]> {
    return this.folderService.getFolderCreationData();
  }
  @Patch('toggle-access/:id')
async toggleAccess(@Param('id') id: string): Promise<boolean> {
  try {
    console.log('Toggling access for folder:', id);
    const success = await this.folderService.updateFolderAccess(id);
    return success;
  } catch (error) {
    console.error('Failed to toggle folder access:', error);
    throw error;
  }
}

    
    
    


}
