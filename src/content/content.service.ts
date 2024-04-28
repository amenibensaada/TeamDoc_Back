import { Injectable } from '@nestjs/common';
import { Content } from './content.schema';
import { ContentRepository } from './content.repository';
import { createContentDTO } from './dto/create-content-dto';
import { DocumentsRepository } from '../document/document.repository'; // Importez le repository DocumentsRepository

@Injectable()
export class ContentService {
  constructor(private readonly contentRepository: ContentRepository,    private readonly documentsRepository: DocumentsRepository, // Injectez le repository DocumentsRepository
) {}

  async createContent(createContent: createContentDTO): Promise<Content> {
    return this.contentRepository.create(createContent);
  }
  async getLastContent(id: string): Promise<Content> {
    const lastContent = await this.contentRepository.findLast(id);
    return lastContent;
  }
  async getAllContentst() {
    const contents = await this.contentRepository.findAll();
    return contents;
  }
  async getDocumentId(contentId: string): Promise<string | null> {
    return this.contentRepository.getDocumentId(contentId);
  }
  async getDocumentById(documentId: string): Promise<Content | null> {
    return this.contentRepository.findByDocumentId(documentId);
  }
  async getdocumentById(documentId: string): Promise<any> {
    return this.documentsRepository.findOne(documentId);
  }
}
