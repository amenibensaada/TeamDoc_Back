import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

const Documentsvalidationlayer = z.object({
  Title: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(50, { message: 'Title cannot exceed 50 characters' }),
    
  createdDate: z
    .string()
    .datetime()
    .min(new Date('2024-01-01T12:00:00').getTime()),

  updatedDate: z
    .string()
    .datetime()
    .refine((value) => value >= this.createdDate, {
      message: 'Update date must be later than creation date',
  }),
});


export class createDocumentsDTOlayer extends createZodDto(
  Documentsvalidationlayer,
) {}
