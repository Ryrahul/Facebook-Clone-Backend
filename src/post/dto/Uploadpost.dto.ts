import { z } from 'zod';
export const PostSchema = z.object({
  content: z
    .string()
    .min(5, { message: 'Must be minimum 5 letters' })
    .max(128, { message: ' more than 128 letters in not allowed' }),
});
export type CreatPostDto = z.infer<typeof PostSchema>;
