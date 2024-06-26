import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './content.schema';
import { DocumentModule } from '../document/document.module'; 
import { DocumentsRepository } from '../document/document.repository'; 

@Module({
  providers: [ContentService, ContentRepository,DocumentsRepository],
  controllers: [ContentController],
  exports: [ContentService, MongooseModule],
  imports: [MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),DocumentModule,],
})

export class ContentModule {}
