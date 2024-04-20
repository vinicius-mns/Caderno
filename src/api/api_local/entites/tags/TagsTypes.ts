import { z } from 'zod'

export const tagsSchema = z.object({
  id: z.string(),
  emoji: z.string(),
  content: z.string()
})

export type ITag = z.infer<typeof tagsSchema>
