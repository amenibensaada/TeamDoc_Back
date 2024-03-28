import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const foldervalidationlayer = z.object({
  Name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(50, { message: 'Name must be at most 50 characters long.' }),

  // user: z.custom((value) => {
  //   if (value !== undefined && value !== null) {
  //     throw new Error('You cannot pass user id.');
  //   }
  // })
});

export class createFolderDTOlayer extends createZodDto(foldervalidationlayer) {}
