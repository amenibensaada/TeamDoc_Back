import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.schema';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() comment: Comment): Promise<Comment> {
    return this.commentsService.create(comment);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() comment: Comment): Promise<Comment> {
    return this.commentsService.update(id, comment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.remove(id);
  }
}
