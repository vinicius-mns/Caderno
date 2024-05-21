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

  const cardsReturn = {
    allCards: () => {
      return cardsLocalApi.read()
    }
  }

  const cardsDeleteByTag = (tagId: string) => {
    cardsLocalApi.deleteCardsByTag(tagId)
    _updateHistory('deleta cards por tag')
  }

  const cardsFilter = () => {
    return cardsLocalApi.filter({
      content: '',
      tags: { excludes: filter.excludeTags, includes: filter.includeTags }
    })
  }

  const filterReturn = {
    findByTags: (tagIds: string[]) => {
      return cardsLocalApi.filter({ content: '', tags: { excludes: [], includes: tagIds } })
    },
    findByExcludeTags: (tagIds: string[]) => {
      return cardsLocalApi.filter({ content: '', tags: { excludes: tagIds, includes: [] } })
    },
    searchByContent: (content: string) => {
      return cardsLocalApi.filter({ content, tags: { excludes: [], includes: [] } })
    }
  }

  const cardsGetAll = () => {
    return cardsLocalApi.read()
  }

  const cardsRander = () => {
    const filterOn = () => {
      const isNotEmpty = (v: string | string[]) => v.length > 0
      return (
        isNotEmpty(filter.text) || isNotEmpty(filter.includeTags) || isNotEmpty(filter.excludeTags)
      )
    }

    filterOn() ? (cards.value = cardsFilter()) : (cards.value = cardsGetAll())
  }

  watch(history, cardsRander, { deep: true })

  return {
    cards,
    filterReturn,
    cardsReturn,
    tagsUseUpdateCards,
    removeTagOnCard,
    createOne,
    updateOne,
    deleteOne,
    filterIncludeTag,
    filterExcludeTags,
    filterText,
    cardsDeleteByTag,
    cardsFilter
  }
})
