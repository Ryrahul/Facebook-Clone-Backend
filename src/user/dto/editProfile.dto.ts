import { z } from 'zod';
export const updateProfileSchema = z.object({
  avatar: z.string(),
  bio: z.string().min(5).max(128),
  birthdate: z.string().datetime(),
  gender: z.string().min(3).max(6),
  location: z.string().min(10).max(128),
  accountType: z.string().min(5).max(7),
});
export type editProfileDto = z.infer<typeof updateProfileSchema>;
