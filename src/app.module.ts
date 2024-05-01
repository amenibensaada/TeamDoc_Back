import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FolderModule } from './folder/folder.module';
import { DocumentModule } from './document/document.module';
import { ContentModule } from './content/content.module';
import { MailingModule } from './mailing/mailing.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { EmailService } from './email/email.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/docManagment'),
    // MongooseModule.forRoot('mongodb://mongodb:27017/docManagment'),
    AuthModule,
    FolderModule,
    DocumentModule,
    ContentModule,
    MailingModule,
    OpenAiModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService, EmailService]
})
export class AppModule {}
