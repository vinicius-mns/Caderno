import { z } from 'zod'

export const IConfigSchema = z.object({
  cardWidth: z.number().max(860).min(200),
  showFilterCards: z.boolean()
})

export type IConfig = z.infer<typeof IConfigSchema>
