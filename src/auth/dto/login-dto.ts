import { z } from 'zod';
export const loginSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'it should be minimum of 5 character' })
    .email(),
  password: z
    .string()
    .min(8, { message: 'must be of minimum 8 characters' })
    .max(128, { message: 'max 128 characters are allowed' }),
});
export type LoginDto = z.infer<typeof loginSchema>;
