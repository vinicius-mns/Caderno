import { ApiStorage } from './ApiStorage'
import { z } from 'zod'

const IConfigSchema = z.object({
  darkmode: z.boolean(),
  columnsCard: z.number().max(3).min(1)
})

export type IConfig = z.infer<typeof IConfigSchema>

export const configLocalStorage = () => new ApiStorage<IConfig>('config', IConfigSchema)
