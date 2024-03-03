import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

const Contentvalidation = z.object({
  content: z.string(),
  creationDate: z.date().default(() => new Date())
});

export class createContentDTO extends createZodDto(Contentvalidation) {}
