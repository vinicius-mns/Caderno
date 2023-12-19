import { Api } from '../Api'
import { z } from 'zod'

const myApiSchemaExample = z.object({
  id: z.string().optional(),
  number: z.number(),
  content: z.string().min(3)
})

export type IMyApiExample = z.infer<typeof myApiSchemaExample>

export const myApiExample = () => new Api<IMyApiExample>('my_api_for_test', myApiSchemaExample)
