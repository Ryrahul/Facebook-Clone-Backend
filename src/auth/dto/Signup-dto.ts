import { z } from 'zod';
export const signupSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'it should be minimum of 5 character' })
    .email(),
  name: z
    .string()
    .min(5, { message: 'username should be of minimum 3 character' })
    .max(25, { message: 'username should be max of 20 character' })
    .regex(
      /^[a-zA-Z0-9.]+$/,
      'Username must only contain letters, numbers, or a period',
    ),
  password: z
    .string()
    .min(8, { message: 'must be of minimum 8 characters' })
    .max(128, { message: 'max 128 characters are allowed' }),
});
export type SignUpDto = z.infer<typeof signupSchema>;
