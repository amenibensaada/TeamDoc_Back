import { Injectable } from '@nestjs/common';
import { Documents } from './document.schema';
import { DocumentsRepository } from './document.repository';

@Injectable()
export class DocumentService {
  constructor(private DocRepositroy: DocumentsRepository) { }

  async findAll() {
    return this.DocRepositroy.findAll();
  }

  async findOne(id: string) {
    return this.DocRepositroy.findOne(id);
  }



  async create(createDocValidator: any): Promise<Documents> {
    return this.DocRepositroy.create(createDocValidator);
  }


  async createavecaffectation(createDocValidator: any): Promise<Documents> {
    return this.DocRepositroy.createavecaffectation(createDocValidator);
  }

  
  async createDocandfolder(
    createDocValidator: any,
    foldername: string,
  ): Promise<Documents> {
    return this.DocRepositroy.createDocandfolder(
      createDocValidator,
      foldername,
    );

   }

  async update(id: string, createDocValidator: any) {
    return this.DocRepositroy.update(id, createDocValidator);
  }

  async remove(id: string) {
    return this.DocRepositroy.remove(id);
  }
}
