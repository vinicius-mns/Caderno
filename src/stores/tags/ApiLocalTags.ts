import LocalStorageApi from '../../myLocalStorage/LocalStorageApi'
import type { IFilterTags, Itag, ItagsApi, ItagsDb } from './Interfaces'

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

  private _getOrderedTags = () => {
    const {
      filter: { includeTags, excludeTags },
      tags
    } = this._storage.read()

    const getName = (tag: Itag) => tag[1]

    const includeTagsNameSet = new Set(includeTags.map(getName))

    const excludeTagsNameSet = new Set(excludeTags.map(getName))

    const isNotIncludedOrExcluded = (tag: Itag) => {
      const tagName = getName(tag)

      return !includeTagsNameSet.has(tagName) && !excludeTagsNameSet.has(tagName)
    }

    const reimainingTags = tags.filter(isNotIncludedOrExcluded)

    return [...includeTags, ...excludeTags, ...reimainingTags]
  }

  public readAllTags = (name?: string) => {
    return new Promise<ItagsDb>((resolve, reject) => {
      setTimeout(() => {
        if (!name) {
          try {
            const store = this._storage.read()

            resolve({ ...store, tags: this._getOrderedTags() })
          } catch (e) {
            if (e instanceof Error) {
              reject(new Error(`Erro ao capturar tags: ${e.message}`))
            } else {
              reject(new Error('Erro inesperado ao ler todas tags'))
            }
          }
        } else {
          try {
            const storage = this._storage.read()

            const filterByName = (tags: Itag[]) => {
              return tags.filter((tag) => tag[1].toLocaleLowerCase().includes(name))
            }

            const tags = filterByName(this._getOrderedTags())

            const includeTags = storage.filter.includeTags
            const excludeTags = storage.filter.excludeTags

            resolve({
              tags,
              filter: { includeTags, excludeTags }
            })
          } catch (e) {
            reject(e)
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

          this._errorValidateTag([emoji, name])

          if (name !== atualName) this._errorExistTag(name)

          const tag: Itag = [emoji, name]

          const allTags = this._storage.read().tags
          const incldeTags = this._storage.read().filter.includeTags
          const excludeTag = this._storage.read().filter.excludeTags

          const newAllTags = [tag, ...allTags.filter((tag) => tag[1] !== atualName)]

          const newIncludeTags = incldeTags.find((tag) => tag[1] === atualName)
            ? [tag, ...incldeTags.filter((tag) => tag[1] !== atualName)]
            : incldeTags

          const newExcludeTag = excludeTag.find((tag) => tag[1] === atualName)
            ? [tag, ...excludeTag.filter((tag) => tag[1] !== atualName)]
            : excludeTag

          const newDb: ItagsDb = {
            tags: newAllTags,
            filter: {
              includeTags: newIncludeTags,
              excludeTags: newExcludeTag
            }
          }

          this._storage.setAndReturn(newDb)

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

  // public realdAllTagsByName = (name: string) => {
  //   return new Promise<ItagsDb>((resolve, reject) => {
  //     setTimeout(() => {
  //       try {
  //         const storage = this._storage.read()

  //         const filter = (tags: Itag[]) => {
  //           return tags.filter((tag) => tag[1].toLocaleLowerCase().includes(name))
  //         }

  //         const tags = filter(storage.tags)
  //         const includeTags = filter(storage.filter.includeTags)
  //         const excludeTags = filter(storage.filter.excludeTags)

  //         resolve({ tags, filter: { includeTags, excludeTags } })
  //       } catch (e) {
  //         reject(e)
  //       }
  //     }, 0)
  //   })
  // }

  setFilter = (newFilter: IFilterTags) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const storage = this._storage.read()

          // verificar o filtro

          this._storage.setAndReturn({
            ...storage,
            filter: newFilter
          })

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  clearFilter = () => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const storage = this._storage.read()

          this._storage.setAndReturn({
            ...storage,
            filter: { includeTags: [], excludeTags: [] }
          })

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }
}
