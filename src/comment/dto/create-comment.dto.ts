import { z } from 'zod';
export const createCommentSchema = z.object({
  content: z.string().min(5).max(1024),
});
export type NewCommentDto = z.infer<typeof createCommentSchema>;
