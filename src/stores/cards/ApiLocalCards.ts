import LocalStorageApi from '../../myLocalStorage/LocalStorageApi'
import type { Itag } from '../tags/Interfaces'
import type { ICardDb, ICardsApi, Icard } from './Interfaces'
import { v4 as uuid } from 'uuid'

const keyLocalStorageCards = 'cards'

const _cardsLocalStorage = new LocalStorageApi<ICardDb>([], keyLocalStorageCards)

export class CardsApiLocal implements ICardsApi {
  constructor(
    private _storage = _cardsLocalStorage,
    private _idGenerete = uuid
  ) {}

  private _validateCard = (card: Icard) => {
    if (!card.content) return 'card content não pode estar vazio'
    if (typeof card.content !== 'string') return 'card content precisa ser uma texto'
    if (card.tags.length < 1) return 'selecione ao menos 1 tag'
  }

  private _insetCardOnDb = (card: Icard) => {
    const storage = this._storage.read()
    this._storage.setAndReturn([...storage, card])
  }

  public create = (param: { content: string; tags: Itag[] }) => {
    return new Promise<boolean>((resolve, reject) => {
      const { content, tags } = param

      setTimeout(() => {
        const newCard: Icard = {
          content,
          tags,
          date: new Date(),
          id: this._idGenerete()
        }

        const invalidateCard = this._validateCard(newCard)

        if (invalidateCard) {
          reject(new Error(invalidateCard))
        } else {
          this._insetCardOnDb(newCard)
          resolve(true)
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

  public read = (filter: { includeTags: string[]; excludeTags: string[] }) => {
    return new Promise<Icard[]>((resolve, reject) => {
      setTimeout(() => {
        const allCards = this._storage.read()

        const cardsIncludeTags = this._filterCardsByTags({
          cards: allCards,
          tagsName: filter.includeTags
        })

        const cardsExcludeTags = this._filterCardsByWithoutTags({
          cards: cardsIncludeTags,
          tagsName: filter.excludeTags
        })

        if (cardsExcludeTags) resolve(cardsExcludeTags)
        else reject(new Error('not found'))
      }, 0)
    })
  }

  public readOne = (id: string) => {
    return new Promise<Icard>((resolve, reject) => {
      setTimeout(() => {
        const allCards = this._storage.read()
        const card = allCards.find((card) => card.id === id)
        if (card) resolve(card)
        else reject(new Error('not found'))
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
        const invalidateCard = this._validateCard(card)

        if (invalidateCard) reject(new Error(invalidateCard))

        const deleteCard = await this.delete(card.id)

        if (!deleteCard) reject(new Error('not found'))

        this._insetCardOnDb(card)

        resolve(true)
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
