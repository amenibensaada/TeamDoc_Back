import { Injectable } from '@nestjs/common';
import { DocumentsCrudRepository } from './document-crud.repository';
import { Documents } from './document.schema';

@Injectable()
export class DocumentCrudService {
  constructor(private DocRepositroy: DocumentsCrudRepository) {}

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
