import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './content.schema';
import { RealTimeService } from 'src/real-time/real-time.service'; // Vérifiez ce chemin d'importation
import { RealTimeGateway } from './real-time-gateways';

@Module({
  providers: [ContentService, RealTimeService, ContentRepository , RealTimeGateway],
  controllers: [ContentController],
  exports: [ContentService, MongooseModule], // Si ContentService doit être exporté
  imports: [MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])]
})
export class ContentModule {}
