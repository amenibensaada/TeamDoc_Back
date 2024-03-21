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
  contentType: z
    .array(z.string())
    .min(1, { message: 'At least one content type must be specified' })
    .max(5, { message: 'Maximum of 5 content types allowed' })
    .optional() 
});

export class createDocumentsDTOlayer extends createZodDto(Documentsvalidationlayer){}
