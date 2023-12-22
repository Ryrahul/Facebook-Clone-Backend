import { z } from 'zod';
export const PostSchema = z.object({
  content: z.string().min(5),
});
export type CreatPostDto = z.infer<typeof PostSchema>;
