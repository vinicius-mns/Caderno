import type { z } from 'zod'
import { Api_localStorage_as_db } from '../../Api_localStorage_as_db'
import { type ICard, cardSchema } from './CardsTypes'
import type { IGenerateID } from '@/api/interfaces'
import { UuidGenerate } from '../generateId/UuidGenerate'

class CardDb extends Api_localStorage_as_db<ICard> {
  constructor(
    public key: string,
    protected _schema: z.AnyZodObject,
    // protected _initivalue: ICard[],
    protected _idGenerate: IGenerateID
  ) {
    super(key, _schema, _idGenerate)
  }

  searchCard = (cards: ICard[], text: string) => {
    const filtred = cards.filter((card) => {
      const cardLowerContent = card.content.toLowerCase()
      return cardLowerContent.includes(text.toLowerCase())
    })
    return filtred
  }

  findByTags = (
    cards: ICard[],
    tagIds: string[],
    matchType: 'some' | 'every',
    tagPresence: 'include' | 'exclude'
  ) => {
    const execute = {
      include: () => {
        return cards.filter((card) => {
          return tagIds[matchType]((tagId) => card.tags.includes(tagId))
        })
      },
      exclude: () => {
        return cards.filter((card) => {
          return !tagIds[matchType]((tagId) => card.tags.includes(tagId))
        })
      }
    }
    return execute[tagPresence]()
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
}

const key = 'cards_local'

// const initialValue: ICard[] = [
//   {
//     id: '0',
//     content: 'card inicial',
//     date: new Date(),
//     tags: ['']
//   }
// ]

export const cardsLocalDb = () => new CardDb(key, cardSchema, new UuidGenerate())
