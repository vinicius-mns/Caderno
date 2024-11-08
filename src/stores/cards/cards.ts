import { defineStore } from 'pinia'
import { CardsApiLocal } from './ApiLocalCards'
import { ref } from 'vue'
import type { Icard } from './Interfaces'
import type { Itag } from '../tags/Interfaces'
import { useWindows } from '../windows'

const apiCards = new CardsApiLocal()

export const useCards = defineStore('cards storage', () => {
  const window = useWindows()

  const cards = ref<Icard[]>([])

  const _errorCard: Icard = {
    content: 'error',
    date: new Date(),
    id: 'error',
    tags: []
  }

  const init = async (filter: { includeTags: string[]; excludeTags: string[] }): Promise<void> => {
    try {
      const allCards = await apiCards.read(filter)

      cards.value = allCards
    } catch (e) {
      console.error(e)

      cards.value = [_errorCard]
    }
  }

  const create = async (param: { content: string; tags: Itag[] }): Promise<void> => {
    await apiCards.create(param)
  }

  const insert = async (card: Icard) => {
    await apiCards.insert(card)
  }

  const createMany = async (param: { content: string; tags: Itag[] }[]) => {
    await apiCards.createMany(param)
  }

  const read = async (filter: {
    includeTags: string[]
    excludeTags: string[]
  }): Promise<Icard[]> => {
    try {
      const allCards = await apiCards.read(filter)

      return allCards
    } catch (e) {
      if (e instanceof Error) console.error(e)
      else console.log('erro inesperado ao capturar todos cards')

      return [_errorCard]
    }
  }

  const atualizeReactiveCards = async (filter: {
    includeTags: Itag[]
    excludeTags: Itag[]
  }): Promise<void> => {
    try {
      const includeTagsNames = filter.includeTags.map((tag) => tag[1])

      const excludeTagsNames = filter.excludeTags.map((tag) => tag[1])

      const allCards = await apiCards.read({
        includeTags: includeTagsNames,
        excludeTags: excludeTagsNames
      })

      cards.value = allCards
    } catch (e) {
      console.error(e)
    }
  }

  const getCard = async (id: string): Promise<Icard> => {
    try {
      const findCard = await apiCards.readOne(id)

      return findCard
    } catch (e) {
      console.error(e)

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
      if (e instanceof Error) console.error(e)
      else console.log('erro inesperado ao deletar card')
    }
  }

  const updateAllTags = async (props: { tag: Itag; name: string }) => {
    await apiCards.updateAllTags(props)
  }

  const shareCard = async (card: Icard) => {
    try {
      await apiCards.readOne(card.id)
    } catch (e) {
      console.log('eee', e)
      console.log('id', card.id)
      window.cardShare.open(card)
    }
  }

  return {
    cards,
    init,
    create,
    insert,
    createMany,
    read,
    atualizeReactiveCards,
    getCard,
    update,
    deleteCard,
    updateAllTags,
    shareCard
  }
})
