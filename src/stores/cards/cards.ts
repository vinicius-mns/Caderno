import { defineStore } from 'pinia'
import { CardsApiLocal } from './ApiLocalCards'
import { nextTick, ref } from 'vue'
import type { Icard, IfilterCard } from './Interfaces'
import type { Itag } from '../tags/Interfaces'

const apiCards = new CardsApiLocal()

export const useCards = defineStore('cards storage', () => {
  const cards = ref<Icard[]>([])

  const textFilterCards = ref<string>('')

  const _errorCard: Icard = {
    content: 'error',
    date: new Date(),
    id: 'error',
    tags: []
  }

  const isCard = (card: Icard | undefined) => {
    return (
      typeof card === 'object' &&
      card !== null &&
      'id' in card &&
      'content' in card &&
      'date' in card &&
      'tags' in card
    )
  }

  const _handleError = (e: Error | unknown) => {
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw new Error('erro inesperado')
    }
  }

  const atualizeReactiveCards = async (filter: {
    includeTags: Itag[]
    excludeTags: Itag[]
    content?: string
  }): Promise<void> => {
    try {
      const includeTagsNames = filter.includeTags.map((tag) => tag[1])

      const excludeTagsNames = filter.excludeTags.map((tag) => tag[1])

      const allCards = await apiCards.read({
        includeTags: includeTagsNames,
        excludeTags: excludeTagsNames,
        content: textFilterCards.value
      })

      cards.value = []

      nextTick(() => (cards.value = allCards))
    } catch (e) {
      _handleError(e)
    }
  }

  const textFilterCardsSet = (text: string) => {
    textFilterCards.value = text
  }
  // const init = async (filter: { includeTags: string[]; excludeTags: string[] }): Promise<void> => {
  //   try {
  //     const allCards = await apiCards.read(filter)

  //     cards.value = allCards
  //   } catch (e) {
  //     _handleError(e)

  //     cards.value = [_errorCard]
  //   }
  // }

  const create = async (param: { content: string; tags: Itag[] }): Promise<void> => {
    try {
      await apiCards.create(param)
    } catch (e) {
      _handleError(e)
    }
  }

  const insert = async (card: Icard) => {
    try {
      await apiCards.insert(card)
    } catch (e) {
      _handleError(e)
    }
  }

  const createMany = async (param: { content: string; tags: Itag[] }[]) => {
    try {
      await apiCards.createMany(param)
    } catch (e) {
      _handleError(e)
    }
  }

  const read = async (filter: IfilterCard): Promise<Icard[]> => {
    try {
      const allCards = await apiCards.read(filter)

      return allCards
    } catch (e) {
      _handleError(e)

      return [_errorCard]
    }
  }

  const getCard = async (id: string): Promise<Icard> => {
    try {
      const findCard = await apiCards.readOne(id)

      return findCard
    } catch (e) {
      _handleError(e)

      return _errorCard
    }
  }

  const update = async (card: Icard) => {
    await apiCards.update(card)
  }

  const deleteCard = async (id: string) => {
    try {
      await apiCards.delete(id)
    } catch (e) {
      _handleError(e)
    }
  }

  const updateAllTags = async (props: { tag: Itag; name: string }) => {
    try {
      await apiCards.updateAllTags(props)
    } catch (e) {
      _handleError(e)
    }
  }

  const openSharedCard = async (card: Icard) => {
    try {
      await apiCards.readOne(card.id)
    } catch (e) {
      return card
    }
  }

  return {
    cards,
    textFilterCards,
    textFilterCardsSet,
    isCard,
    create,
    insert,
    createMany,
    read,
    atualizeReactiveCards,
    getCard,
    update,
    deleteCard,
    updateAllTags,
    shareCard: openSharedCard
  }
})
