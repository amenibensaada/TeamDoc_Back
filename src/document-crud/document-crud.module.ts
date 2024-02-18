import { Module } from '@nestjs/common';
import { DocumentCrudService } from './document-crud.service';
import { DocumentCrudController } from './document-crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Documents, DocumentsSchema } from './document.schema';

@Module({
  controllers: [DocumentCrudController],
  providers: [DocumentCrudService],
  imports: [
    MongooseModule.forFeature([
      { name: Documents.name, schema: DocumentsSchema },
    ]),
  ],
})
export class DocumentCrudModule {}
