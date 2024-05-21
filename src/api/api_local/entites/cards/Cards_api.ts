import type { z } from 'zod'
import { Api_localStorage_as_db } from '../../Api_localStorage_as_db'
import { type ICard, cardSchema } from './CardsTypes'
import type { IGenerateID } from '@/api/interfaces'
import { UuidGenerate } from '../generateId/UuidGenerate'

class CardDb extends Api_localStorage_as_db<ICard> {
  constructor(
    public key: string,
    protected _schema: z.AnyZodObject,
    protected _idGenerate: IGenerateID
  ) {
    super(key, _schema, _idGenerate)
  }

  filter = (arg: { content: string; tags: { includes: string[]; excludes: string[] } }) => {
    const allCards = this.read()
    const filterByContent = allCards.filter((card) => {
      return card.content.toLowerCase().includes(arg.content.toLocaleLowerCase())
    })
    const filterByIncludeTags = filterByContent.filter((card) => {
      return arg.tags.includes.every((tagId) => card.tags.includes(tagId))
    })
    const filterByExcludeTags = filterByIncludeTags.filter((card) => {
      return !arg.tags.excludes.some((tagId) => card.tags.includes(tagId))
    })
    return filterByExcludeTags
  }

  removeTagOnCards = (tagId: string) => {
    const allCards = this.read()
    const newCards = allCards.map((card) => {
      const newTagsOnCard = card.tags.filter((id) => id !== tagId)
      const newCard: ICard = { ...card, tags: newTagsOnCard }
      return newCard
    })
    this.create(newCards)
  }

  deleteCardsByTag = (tagId: string) => {
    const allCards = this.read()
    const newCards = allCards.filter((card) => !card.tags.includes(tagId))
    this.create(newCards)
  }
}

const key = 'cards_local'

export const cardsLocalDb = () => new CardDb(key, cardSchema, new UuidGenerate())
