import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

const foldervalidationlayer = z.object({
  Name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
});


export class createFolderDTOlayer extends createZodDto(foldervalidationlayer) {}