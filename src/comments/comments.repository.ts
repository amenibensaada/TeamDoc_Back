import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async create(comment: Comment): Promise<Comment> {
    const createdComment = new this.commentModel(comment);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
  }

  async remove(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
