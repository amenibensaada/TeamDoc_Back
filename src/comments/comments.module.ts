import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './comments.schema';

import { CommentsGateway } from './comments.Gateway';

@Module({
  providers: [CommentsService, CommentsRepository, CommentsGateway],
  controllers: [CommentsController],
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])]
})
export class CommentsModule {}
