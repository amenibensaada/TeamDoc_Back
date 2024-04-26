import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.schema';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { FolderRepository } from './folder.repository';
import { UsersService } from '../users/users.service'; 
import { UserRepository } from '../users/users.repository'; 
import { UsersModule } from '../users/users.module'; 
import { EmailService } from '../email/email.service'; // Importez EmailService ici


@Module({
  controllers: [FolderController],
  providers: [FolderService, FolderRepository,UsersService,UserRepository,EmailService],
  imports: [MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),UsersModule]
})
export class FolderModule {}
