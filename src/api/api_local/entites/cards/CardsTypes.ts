import { z } from 'zod'

export const cardSchema = z.object({
  id: z.string(),
  date: z
    .string()
    .transform((value) => new Date(value))
    .or(z.date()),
  content: z.string().min(3),
  tags: z.array(z.string())
})

export type ICard = z.infer<typeof cardSchema>
