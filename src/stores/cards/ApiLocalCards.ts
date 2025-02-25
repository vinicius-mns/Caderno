import LocalStorageApi from '../../myLocalStorage/LocalStorageApi'
import type { Itag } from '../tags/Interfaces'
import type { ICardsApi, Icard, IfilterCard } from './Interfaces'
import { v4 as uuid } from 'uuid'

const keyLocalStorageCards = 'cards'

const _cardsLocalStorage = new LocalStorageApi<Icard[]>([], keyLocalStorageCards)

export class CardsApiLocal implements ICardsApi {
  constructor(
    private _storage = _cardsLocalStorage,
    private _idGenerete = uuid
  ) {}

  private _validateCard = (card: Icard) => {
    if (!card.content) throw new Error('card content não pode estar vazio')

    if (typeof card.content !== 'string') throw new Error('card content precisa ser uma texto')

    if (card.tags.length < 1) throw new Error('selecione ao menos 1 tag')
  }

  private _insetCardOnDb = (card: Icard | Icard[]) => {
    const atualCards = this._storage.read()

    Array.isArray(card)
      ? this._storage.setAndReturn([...atualCards, ...card])
      : this._storage.setAndReturn([...atualCards, card])
  }

  public create = (param: { content: string; tags: Itag[] }) => {
    return new Promise<boolean>((resolve, reject) => {
      const { content, tags } = param

      setTimeout(() => {
        try {
          const newCard: Icard = {
            content,
            tags,
            date: new Date(),
            id: this._idGenerete()
          }

          this._validateCard(newCard)

          this._insetCardOnDb(newCard)

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public insert = (card: Icard) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          this._validateCard(card)

          this._insetCardOnDb(card)

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public createMany = (param: { content: string; tags: Itag[] }[]) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const newCards = param.map(({ content, tags }) => {
            const newCard: Icard = {
              content,
              tags,
              date: new Date(),
              id: this._idGenerete()
            }

            this._validateCard(newCard)

            return newCard
          })

          this._insetCardOnDb(newCards)

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  private _filterCardsByTags = (param: { cards: Icard[]; tagsName: string[] }) => {
    const { cards, tagsName } = param

    return cards.filter((card) => {
      const cardTagsName = card.tags.map((tag) => tag[1])

      return tagsName.every((tagName) => cardTagsName.includes(tagName))
    })
  }

  private _filterCardsByWithoutTags = (param: { cards: Icard[]; tagsName: string[] }) => {
    const { cards, tagsName } = param

    return cards.filter((card) => {
      const cardTagsName = card.tags.map((tag) => tag[1])

      return !tagsName.some((tagName) => cardTagsName.includes(tagName))
    })
  }

  private _filterCardsBycontent = (param: { cards: Icard[]; content: string }) => {
    const { cards, content } = param

    return cards.filter((card) => card.content.toLowerCase().includes(content.toLowerCase()))
  }

  public read = ({ includeTags, excludeTags, content }: IfilterCard) => {
    return new Promise<Icard[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          const allCards = this._storage.read()

          const cardsWithIncludeTags = this._filterCardsByTags({
            cards: allCards,
            tagsName: includeTags
          })

          const cardsWithoutExcludeTags = this._filterCardsByWithoutTags({
            cards: cardsWithIncludeTags,
            tagsName: excludeTags
          })

          const cardsWithContent = this._filterCardsBycontent({
            cards: cardsWithoutExcludeTags,
            content
          })

          resolve(cardsWithContent)
        } catch (e) {
          reject(new Error(`Failed to read cards: ${e instanceof Error ? e.message : e}`))
        }
      }, 0)
    })
  }

  public readOne = (id: string) => {
    return new Promise<Icard>((resolve, reject) => {
      setTimeout(() => {
        try {
          const allCards = this._storage.read()

          const card = allCards.find((card) => card.id === id)

          if (card) resolve(card)
          else reject(new Error('not found'))
        } catch (e) {
          reject(new Error(`Failed to read cards: ${e instanceof Error ? e.message : e}`))
        }
      }, 0)
    })
  }

  public delete = (id: string) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(async () => {
        const getCard = await this.readOne(id)

        if (getCard) {
          const storage = this._storage.read()

          const deleted = storage.filter((card) => card.id !== id)

          this._storage.setAndReturn(deleted)

          resolve(true)
        } else {
          reject(new Error('not found'))
        }
      }, 0)
    })
  }

  public update = (card: Icard) => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(async () => {
        try {
          this._validateCard(card)

          await this.readOne(card.id)

          const allCards = [...this._storage.read()]

          const index = allCards.findIndex((c) => c.id === card.id)

          allCards[index] = card

          this._storage.setAndReturn(allCards)

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public updateAllTags = async (param: { tag: Itag; name: string }) => {
    const { tag, name } = param

    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        try {
          const allcards = this._storage.read()

          const cardsWithTag = this._filterCardsByTags({
            cards: allcards,
            tagsName: [name]
          })

          const newCards = allcards.map((card) => {
            const cardIdsToUpdate = cardsWithTag.map((c) => c.id)

            const find = cardIdsToUpdate.includes(card.id)

            if (find) {
              const updatedTag = card.tags.filter((tag) => tag[1] !== name)
              return { ...card, tags: [...updatedTag, tag] }
            } else {
              return card
            }
          })

          this._storage.setAndReturn(newCards)

          resolve(true)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  public deleteAll = async () => {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        this._storage.clear()

        const allCards = this._storage.read()

        if (allCards.length < 1) resolve(true)
        else reject(new Error('error deleting'))
      }, 0)
    })
  }
}
