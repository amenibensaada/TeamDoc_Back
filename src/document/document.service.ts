import { Injectable } from '@nestjs/common';
import { Documents } from './document.schema';
import { DocumentsRepository } from './document.repository';

@Injectable()
export class DocumentService {
  constructor(private DocRepositroy: DocumentsRepository) { }

  async findAll() {
    return this.DocRepositroy.findAll();
  }

  async findOne(id: number) {
    return this.DocRepositroy.findOne(id);
  }



  async create(createDocValidator: any): Promise<Documents> {
    return this.DocRepositroy.create(createDocValidator);
  }



  async update(id: number, createDocValidator: any) {
    return this.DocRepositroy.update(id, createDocValidator);
  }

  async remove(id: number) {
    return this.DocRepositroy.remove(id);
  }
}
