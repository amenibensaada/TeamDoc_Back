import { Injectable } from '@nestjs/common';
import { Documents } from './document.schema';
import { DocumentsRepository } from './document.repository';
import { createDocumentsDTOlayer } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(private DocRepositroy: DocumentsRepository) {}
  async findAll(userId: string) {
    return this.DocRepositroy.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    return this.DocRepositroy.findOne(id, userId);
  }
  async update(id: string, createDocValidator: any, userId: string) {
    return this.DocRepositroy.update(id, createDocValidator, userId);
  }

  async remove(id: string, userId: string) {
    return this.DocRepositroy.remove(id, userId);
  }

  async create(createDocValidator: any, userId: string): Promise<Documents> {
    return this.DocRepositroy.create(createDocValidator, userId);
  }

  async createavecaffectation(
    folderId: string,
    createDocValidator: createDocumentsDTOlayer,
    userId: string
  ): Promise<Documents> {
    return this.DocRepositroy.createavecaffectation(folderId, createDocValidator, userId);
  }


 



  // async createDocandfolder(createDocValidator: any, foldername: string): Promise<Documents> {
  //   return this.DocRepositroy.createDocandfolder(createDocValidator, foldername);
  // }

}
