import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FolderModule } from './folder/folder.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/docManagment'),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    FolderModule,
    DocumentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
