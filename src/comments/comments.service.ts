import { Injectable } from '@nestjs/common';
import { Comment } from './comments.schema';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async create(comment: Comment): Promise<Comment> {
    return this.commentsRepository.create(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.findAll();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentsRepository.findOne(id);
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    return this.commentsRepository.update(id, comment);
  }

  async remove(id: string): Promise<Comment> {
    return this.commentsRepository.remove(id);
  }
}
