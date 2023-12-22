import { z } from 'zod';
export const UpdatePostSchema = z.object({
  content: z.string().min(5),
});
export type UpdatePostDto = Required<z.infer<typeof UpdatePostSchema>>;
