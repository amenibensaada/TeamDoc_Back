import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderCrudModule } from './folder-crud/folder-crud.module';
import { DocumentCrudModule } from './document-crud/document-crud.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/docManagment'),
    FolderCrudModule,
    DocumentCrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
