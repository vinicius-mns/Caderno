import { Api } from './Api'
import { z } from 'zod'

export const tagsSchema = z.object({
  img: z.string(),
  content: z.string()
})

export type ITag = z.infer<typeof tagsSchema>

export const tagsApi = () => new Api<ITag>('tags_local', tagsSchema)
