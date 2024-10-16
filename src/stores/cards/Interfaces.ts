import type { Itag } from '../tags/Interfaces'

export interface Icard {
  id: string
  date: Date | string
  content: string
  tags: Itag[]
}

export type ICardDb = Icard[]

export interface ICardsApi {
  create: (param: { content: string; tags: Itag[] }) => Promise<boolean>
  createMany: (param: { content: string; tags: Itag[] }[]) => Promise<boolean>
  read: (filter: { includeTags: string[]; excludeTags: string[] }) => Promise<Icard[]>
  readOne: (id: string) => Promise<Icard>
  update: (card: Icard) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  updateAllTags: (param: { tag: Itag; name: string }) => Promise<boolean>
  deleteAll: () => Promise<boolean>
}
