import LocalStorageApi from '../../myLocalStorage/LocalStorageApi'
import type { Itag, ItagsApi, ItagsDb, TypeOfTags } from './Interfaces'

const keyTagsLocalStorage = 'tags'

const tagsLocalStorage = new LocalStorageApi<ItagsDb>(
  {
    tags: [],
    filter: {
      includeTags: [],
      excludeTags: []
    }
  },
  keyTagsLocalStorage
)

export class TagsApiLocal implements ItagsApi {
  constructor(private _storage = tagsLocalStorage) {}

  //   const tagNotFound: Itag = ['❌', 'not-found']

  private _errorValidateTag = (tag: Itag) => {
    const emoji = tag[0]

    const content = tag[1]

    if (emoji.length < 1) throw new Error('Emoji não pode ser vazio')

    if (content.length < 2) throw new Error('Tag precisa ter ao menos 2 characteres')
  }

  private _errorExistTag = (name: string) => {
    const allTagsNames = this._storage.read().tags.map((t) => t[1])

    if (allTagsNames.includes(name)) {
      throw new Error(`Ja existe uma tag com o nome: ${name}`)
    }
  }

  private _tagDelete = (name: string) => {
    const allTags = this._storage.read().tags

    const incldeTags = this._storage.read().filter.includeTags

    const excludeTag = this._storage.read().filter.excludeTags

    const newAllTags = allTags.filter((tag) => tag[1] !== name)

    const newIncludeTags = incldeTags.filter((tag) => tag[1] !== name)

    const newExcludeTag = excludeTag.filter((tag) => tag[1] !== name)

    const newDb: ItagsDb = {
      tags: newAllTags,
      filter: {
        includeTags: newIncludeTags,
        excludeTags: newExcludeTag
      }
    }

    this._storage.setAndReturn(newDb)
  }

  private _tagUpdate = (param: { tag: Itag; atualName: string }) => {
    const { tag, atualName } = param

    const allTags = this._storage.read().tags

    const incldeTags = this._storage.read().filter.includeTags

    const excludeTag = this._storage.read().filter.excludeTags

    const newAllTags = [...allTags.filter((tag) => tag[1] !== atualName), tag]

    const newIncludeTags = incldeTags.find((tag) => tag[1] === atualName)
      ? [...incldeTags.filter((tag) => tag[1] !== atualName), tag]
      : incldeTags

    const newExcludeTag = excludeTag.find((tag) => tag[1] === atualName)
      ? [...excludeTag.filter((tag) => tag[1] !== atualName), tag]
      : excludeTag

    const newDb: ItagsDb = {
      tags: newAllTags,
      filter: {
        includeTags: newIncludeTags,
        excludeTags: newExcludeTag
      }
    }

    this._storage.setAndReturn(newDb)
  }

  public createTag = (param: { emoji: string; name: string }) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const { emoji, name } = param

          this._errorValidateTag([emoji, name])

          this._errorExistTag(name)

          const storage = this._storage.read()

          const tag: Itag = [emoji, name]

          const newTags = [...storage.tags, tag]

          this._storage.setAndReturn({ ...storage, tags: newTags })

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public createManyTags = (param: { emoji: string; name: string }[]) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const tags: Itag[] = param.map(({ emoji, name }) => {
            this._errorValidateTag([emoji, name])

            this._errorExistTag(name)

            return [emoji, name]
          })

          const storage = this._storage.read()

          const newTags = [...storage.tags, ...tags]

          this._storage.setAndReturn({ ...storage, tags: newTags })

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public readTag = (name: string) => {
    return new Promise<Itag>((resolve, reject) => {
      setTimeout(() => {
        const LC = (v: string) => v.toLocaleLowerCase()

        const findTag = this._storage.read().tags.find((tag) => LC(tag[1]) === LC(name))

        if (!findTag) reject(new Error('Tag nao encontrada'))
        else resolve(findTag)
      }, 0)
    })
  }

  public readAllTags = () => {
    return new Promise<Itag[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          const tags = this._storage.read().tags
          resolve(tags)
        } catch (e) {
          if (e instanceof Error) {
            reject(new Error(`Erro ao capturar tags: ${e.message}`))
          } else {
            reject(new Error('Erro inesperado ao ler todas tags'))
          }
        }
      }, 0)
    })
  }

  public updateTag = (param: { emoji: string; name: string; atualName: string }) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const { emoji, name, atualName } = param

          this._errorExistTag(name)

          this._tagUpdate({ tag: [emoji, name], atualName })

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public deleteTag = (name: string) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          this._tagDelete(name)
          resolve(true)
        } catch (e) {
          reject(new Error(`Erro ao deletar tag: ${e}`))
        }
      }, 0)
    })
  }

  public deleteAll = () => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          this._storage.clear()
          resolve(true)
        } catch (e) {
          if (e instanceof Error) {
            reject(new Error(`Erro ao deletar todas tags: ${e.message}`))
          } else {
            reject(new Error('Erro inesperado ao deletar todas tags'))
          }
        }
      }, 0)
    })
  }

  private _filterGetTags = async (type: TypeOfTags) => {
    return new Promise<Itag[]>((resolve, reject) => {
      const allTagsNames = this._storage.read().tags.map((tag) => tag[1])

      const tagsFilter = this._storage.read().filter[type]

      const TagsFiltredIfNotExist = tagsFilter.filter((tag) => allTagsNames.includes(tag[1]))

      if (TagsFiltredIfNotExist) resolve(TagsFiltredIfNotExist)
      else reject(new Error('Tags nao encontradas'))
    })
  }

  private _filterAddToFilter = (type: TypeOfTags, name: string) => {
    const addTagOnList = (tag: Itag, allTags: Itag[]) => [...allTags, tag]

    const removeTagOnList = (tag: Itag, allTags: Itag[]) => allTags.filter((T) => T[1] !== tag[1])

    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const oppositeType = type === 'includeTags' ? 'excludeTags' : 'includeTags'

        const storage = this._storage.read()

        const filterStorage = storage.filter

        const tag = storage.tags.find((tag) => tag[1] === name)

        if (tag) {
          const tagsList = filterStorage[type]

          const tagsOppositeList = filterStorage[oppositeType]

          const newTagsList = addTagOnList(tag, tagsList)

          const newOppositeTagsList = removeTagOnList(tag, tagsOppositeList)

          const newFilterStore = {
            ...filterStorage,
            [type]: newTagsList,
            [oppositeType]: newOppositeTagsList
          }

          this._storage.setAndReturn({ ...storage, filter: newFilterStore })

          resolve(true)
        } else {
          reject(new Error('Tag não encontrada'))
        }
      }, 0)
    })
  }

  private _filterRemoveToFilter = (type: TypeOfTags, name: string) => {
    const removeTagOnList = (tag: Itag, allTags: Itag[]) => allTags.filter((T) => T[1] !== tag[1])

    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const storage = this._storage.read()

        const filterStorage = storage.filter

        const tagsList = filterStorage[type]

        const tag = storage.tags.find((tag) => tag[1] === name)

        if (tag) {
          const newTags = removeTagOnList(tag, tagsList)

          this._storage.setAndReturn({
            ...storage,
            filter: { ...filterStorage, [type]: newTags }
          })

          resolve(true)
        } else {
          reject(new Error('Tag não encontrada'))
        }
      }, 0)
    })
  }

  private _filterClear = (type: TypeOfTags) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const storage = this._storage.read()

          const filterStore = storage.filter

          const newTags = [] as string[]

          this._storage.setAndReturn({ ...storage, filter: { ...filterStore, [type]: newTags } })

          resolve(true)
        } catch (e) {
          if (e instanceof Error) {
            reject(new Error(`Erro ao limpar tags: ${e.message}`))
          } else {
            reject(new Error('Erro inesperado ao limpar tags'))
          }
        }
      }, 0)
    })
  }

  public filter = (type: TypeOfTags) => {
    return {
      getTags: () => this._filterGetTags(type),
      addToFilter: (name: string) => this._filterAddToFilter(type, name),
      removeToFilter: (name: string) => this._filterRemoveToFilter(type, name),
      clear: () => this._filterClear(type)
    }
  }
}
