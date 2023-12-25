import {z} from 'zod'
export const editNameSchema=z.object({
    name:z.string().min(3).max(128),
    password:z.string().min(8).max(128)
})
export type editNameDto= z.infer<typeof editNameSchema>;