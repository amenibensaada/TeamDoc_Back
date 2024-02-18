import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.schema';
import { FolderCrudController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
  controllers: [FolderCrudController],
  providers: [FolderService],
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])
  ],
})
export class FolderModule { }
