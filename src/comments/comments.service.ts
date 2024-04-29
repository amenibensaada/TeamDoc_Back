import { Injectable } from '@nestjs/common';
import { Comment } from './comments.schema';
import { CommentsRepository } from './comments.repository';
import { CommentsGateway } from './comments.Gateway';
import { Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly appGateway: CommentsGateway
  ) {}

  async create(comment: Comment): Promise<Comment> {
    const newComment = await this.commentsRepository.create({
      ...comment,
      user: new Types.ObjectId(comment.user as any) as any
    });
    this.appGateway.server.emit('newComment', newComment);
    return newComment;
  }

  async findAll(documentId: string): Promise<Comment[]> {
    return this.commentsRepository.findAll(documentId);
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findOne(id);
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    const updated = await this.commentsRepository.update(id, comment);
    this.appGateway.server.emit('newComment', comment);
    return updated;
  }

  async remove(id: string): Promise<Comment> {
    const deleted = await this.commentsRepository.remove(id);
    this.appGateway.server.emit('newComment', {});
    return deleted;
  }
}
