import { defineStore } from 'pinia'
import { CardsApiLocal } from './ApiLocalCards'
import { ref } from 'vue'
import type { Icard } from './Interfaces'
import type { Itag } from '../tags/Interfaces'

const apiCards = new CardsApiLocal()

export const useCards = defineStore('cards storage', () => {
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
    try {
      await apiCards.create(param)
    } catch (e) {
      if (e instanceof Error) console.error(e)
      else console.log('erro inesperado ao criar card')
    }
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
    try {
      await apiCards.update(card)
    } catch (e) {
      if (e instanceof Error) console.error(e)
      else console.log('erro inesperado ao atualizar card')
    }
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

  return {
    cards,
    init,
    create,
    read,
    atualizeReactiveCards,
    getCard,
    update,
    deleteCard,
    updateAllTags
  }
})
