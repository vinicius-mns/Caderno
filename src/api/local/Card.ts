import { tagsSchema } from '.'
import { Api } from './Api'
import { z } from 'zod'

const cardSchema = z.object({
  id: z.string(),
  date: z.date(),
  content: z.string().min(3),
  tags: z.array(tagsSchema)
})

export type ICard = z.infer<typeof cardSchema>

export const cardLocal = () => new Api<ICard>('card_local', cardSchema)
