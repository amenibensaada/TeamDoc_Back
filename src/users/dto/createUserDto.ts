import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { passwordRegex } from './reset-password.input';

export const CreateUserInputValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z
    .string()
    .min(6)
    .regex(
      passwordRegex,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character',
    ),
  confirmPassword: z.string(),
});

export class CreateUserInput extends createZodDto(CreateUserInputValidator) {}
