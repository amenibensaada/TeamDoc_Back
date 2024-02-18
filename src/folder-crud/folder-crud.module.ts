import { Module } from '@nestjs/common';
import { FolderCrudService } from './folder-crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.schema';
import { FolderCrudController } from './folder-crud.controller';

@Module({
  controllers: [FolderCrudController],
  providers: [FolderCrudService],
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])
  ],
})
export class FolderCrudModule {}
