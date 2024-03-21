import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const Documentsvalidationlayer = z.object({
  Title: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(50, { message: 'Title cannot exceed 50 characters' }),

});

export class createDocumentsDTOlayer extends createZodDto(Documentsvalidationlayer){}
