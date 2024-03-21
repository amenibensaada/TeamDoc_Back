import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './folder.schema';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { FolderRepository } from './folder.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FolderService, FolderRepository],
  controllers: [FolderController],
  exports: [FolderService, MongooseModule],
  imports: [AuthModule, MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])]
})
export class FolderModule {}
