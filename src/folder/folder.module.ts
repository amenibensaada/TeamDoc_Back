import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.schema';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { FolderRepository } from './folder.repository';

@Module({
  controllers: [FolderController],
  providers: [FolderService, FolderRepository],
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
  ],
})
export class FolderModule { }
