import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Documents, DocumentsSchema } from './document.schema';
import { DocumentService } from './document.service';
import { DocumentsRepository } from './document.repository';
import { DocumentController } from './document.controller';
import { Folder, FolderSchema } from 'src/folder/folder.schema';
import { Content, ContentSchema } from 'src/content/content.schema';
import { FolderRepository } from 'src/folder/folder.repository';
import { FolderModule } from 'src/folder/folder.module';

@Module({
  controllers: [DocumentController],
  exports: [MongooseModule, DocumentsRepository],

  providers: [DocumentService, DocumentsRepository,FolderRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Documents.name, schema: DocumentsSchema },
      { name: Folder.name, schema: FolderSchema },
      { name: Content.name, schema: ContentSchema }
    ]),FolderModule
  ]
})
export class DocumentModule {}
