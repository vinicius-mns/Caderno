import { z } from 'zod'

export const IConfigSchema = z.object({
  columnsCard: z.number().max(3).min(1),
  showFilterCards: z.boolean()
})

export type IConfig = z.infer<typeof IConfigSchema>
