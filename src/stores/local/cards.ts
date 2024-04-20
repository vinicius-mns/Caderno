import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import { cardsLocalDb } from '@/api/api_local/entites/cards/Cards_api'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

export const useCards = defineStore('cards', () => {
  const cardsLocalApi = cardsLocalDb()

  const filter = reactive({
    includeTags: [] as string[],
    excludeTags: [] as string[],
    text: ''
  })

  const history = reactive({
    value: [] as string[]
  })

  const cards = ref(cardsLocalApi.read())

  const _updateHistory = (message: string) => {
    const newHistory = history.value
    if (newHistory.length >= 5) newHistory.shift()
    newHistory.push(message)
    history.value = newHistory
  }

  const tagsUseUpdateCards = () => {
    _updateHistory('tagsUpdated')
  }

  const createOne = (card: ICard) => {
    const cardWithDate: ICard = { ...card, date: new Date() }
    cardsLocalApi.createOne(cardWithDate)
    _updateHistory('criou um card')
  }

  const updateOne = (card: ICard) => {
    cardsLocalApi.updateOne(card.id, card)
    _updateHistory('atualizou um card')
  }

  const deleteOne = (id: string) => {
    cardsLocalApi.deleteOne(id)
    _updateHistory('deletou um card')
  }

  const filterIncludeTag = (tagIds: string[]) => {
    filter.includeTags = tagIds
    _updateHistory('filtrou por tag')
  }

  const filterExcludeTags = (tagIds: string[]) => {
    filter.excludeTags = tagIds
    _updateHistory('filtrou por nao tem tag')
  }

  const filterText = (text: string) => {
    filter.text = text
    _updateHistory('pesquisa')
  }

  const removeTagOnCard = (tagId: string) => {
    cardsLocalApi.removeTagOnCards(tagId)
    _updateHistory('deleta tag de cards')
  }

  const filterReturn = {
    findByTags: (cards: ICard[], tagIds: string[]) => {
      return cardsLocalApi.findByTags(cards, tagIds, 'every', 'include')
    },
    findByExcludeTags: (cards: ICard[], tagIds: string[]) => {
      return cardsLocalApi.findByTags(cards, tagIds, 'some', 'exclude')
    },
    searchByText: (cards: ICard[], text: string) => {
      return cardsLocalApi.searchCard(cards, text)
    }
  }

  const filterChain = (cards: ICard[]) => {
    const filter1 = filterReturn.findByTags(cards, filter.includeTags)
    const filter2 = filterReturn.findByExcludeTags(filter1, filter.excludeTags)
    const filter3 = filterReturn.searchByText(filter2, filter.text)
    return filter3
  }

  const updateCards = () => {
    const cardsInDb = cardsLocalApi.read()
    const cardsFiltreds = filterChain(cardsInDb)
    cards.value = cardsFiltreds
    console.log(history.value)
  }

  watch(history, updateCards, { deep: true })

  return {
    cards,
    filterReturn,
    tagsUseUpdateCards,
    removeTagOnCard,
    createOne,
    updateOne,
    deleteOne,
    filterIncludeTag,
    filterExcludeTags,
    filterText
  }
})
