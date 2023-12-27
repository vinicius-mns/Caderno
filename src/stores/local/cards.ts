import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type ICard, cardLocal } from '@/api/local'

export const useLocalCards = defineStore('localCards', () => {
  const api = cardLocal()

  const getAll = ref(JSON.parse(api.readAll().data) as unknown as ICard[])

  const _updateCards = () => {
    const all = api.readAll()

    if (all.status !== 200) {
      console.log('erro ao capturar cards')
    } else {
      getAll.value = JSON.parse(all.data)
    }
  }

  const create = (tag: ICard) => {
    try {
      const createCard = api.create(tag)

      if (createCard.status !== 201) {
        console.log(createCard.data)
      }

      _updateCards()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getAll,
    create
  }
})
