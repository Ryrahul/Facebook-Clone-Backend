import { string, z } from 'zod';
const UpdateCommentSchema = z.object({
  content: z.string().min(5).max(1024),
});
export type UpdateCommentDto = z.infer<typeof UpdateCommentSchema>;
