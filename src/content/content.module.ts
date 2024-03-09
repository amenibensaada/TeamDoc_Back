import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './content.schema';

@Module({
  providers: [ContentService, ContentRepository],
  controllers: [ContentController],
  exports: [ContentService, MongooseModule],
  imports: [MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])]
})
export class ContentModule {}
