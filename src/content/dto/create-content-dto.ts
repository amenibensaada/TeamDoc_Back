import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

const Contentvalidation = z.object({
  documentId: z.string(),
  content: z.string(),
  creationDate: z.date().default(() => new Date())
});

export class createContentDTO extends createZodDto(Contentvalidation) {}
