import type { BaseApi } from './BaseApi'
import { z } from 'zod'

const cardSchema = z.object({
  id: z.string(),
  content: z.string().min(3),
  date: z.date(),
  tags: z.array(z.string())
})

export type ICard = z.infer<typeof cardSchema>

const initialCard: ICard = {
  id: '0',
  content: 'Card inicial',
  date: new Date(),
  tags: []
}

export class Card implements BaseApi<ICard> {}
