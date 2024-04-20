import { z } from 'zod'
import { LStorage } from './LStorage'
import { ApiBase } from './ApiBase'

const IConfigSchema = z.object({
  columnsCard: z.number().max(3).min(1),
  showFilterCards: z.boolean()
})

export type IConfig = z.infer<typeof IConfigSchema>

const initialValue: IConfig = {
  columnsCard: window.innerWidth < 768 ? 1 : 2,
  showFilterCards: false
}

const lStorageConfig = () => new LStorage<IConfig>('config_local')

export const configStorage = () =>
  new ApiBase<IConfig>(lStorageConfig(), IConfigSchema, initialValue)
