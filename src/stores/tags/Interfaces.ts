export type Itag = [string, string]

export type TypeOfTags = 'includeTags' | 'excludeTags'

export interface IFilterTags {
  includeTags: Itag[]
  excludeTags: Itag[]
}

export interface ItagsDb {
  tags: Itag[]
  filter: IFilterTags
}

export interface IFilterMethods {
  getTags: () => Promise<Itag[]>
  addToFilter: (name: string) => Promise<boolean>
  removeToFilter: (name: string) => Promise<boolean>
  clear: () => Promise<boolean>
}

export interface ItagsApi {
  createTag: (param: { emoji: string; name: string }) => Promise<boolean>
  createManyTags: (param: { emoji: string; name: string }[]) => Promise<boolean>
  readTag: (name: string) => Promise<Itag>
  readAllTags: () => Promise<Itag[]>
  updateTag: (param: { emoji: string; name: string; atualName: string }) => Promise<boolean>
  deleteTag: (name: string) => Promise<boolean>
  deleteAll: () => Promise<boolean>
  filter: (type: TypeOfTags) => IFilterMethods
}
