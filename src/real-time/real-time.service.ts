import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { ContentRepository } from 'src/content/content.repository';

import { Content } from 'src/content/content.schema';

@Injectable()
export class RealTimeService {
  private server: Server;

  constructor(private readonly contentRepository: ContentRepository) {}

  initialize(server: Server) {
    this.server = server;
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });

      socket.on('message', (data) => {
        console.log(`Received message from client ${socket.id}: ${data}`);
        
        // Broadcast the received message to all clients except the sender
        socket.broadcast.emit('serverMessage', data);
        console.log(`Message broadcasted to all clients except ${socket.id}: ${data}  test`);
      });

      

      socket.on('updateContent', async (content: Content) => {
        console.log(`Updating content: ${content.id}`);
        const updatedContent = await this.contentRepository.updateContentById(content.id, content.content);
        if (updatedContent) {
          this.emitContentUpdate(updatedContent.id, updatedContent.content);
        }
      });
    });
  }

  emitContentUpdate(documentId: string, updatedContent: string) {
    if (this.server) {
      this.server.emit('contentUpdate', { documentId, updatedContent });
      console.log(`Content update emitted for document ID ${documentId}`);
    } else {
      console.error('Server is not initialized.');
    }
  }
}