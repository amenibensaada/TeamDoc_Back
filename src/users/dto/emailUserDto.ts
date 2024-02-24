import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const EmailUserInputValidator = z.object({
  email: z.string(),
});

export class EmailUserInput extends createZodDto(EmailUserInputValidator) {}
