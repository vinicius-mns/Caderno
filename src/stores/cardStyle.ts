// import { cardStyleLocalDb } from '@/api/api_local/entites/cardsStyle/Card_Style_api'
// import type { ICardStyle } from '@/api/api_local/entites/cardsStyle/CardsStyleTypes'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStyle = defineStore('cardStyle', () => {
  // const cardStyleApi = cardStyleLocalDb()

  // const history = reactive({
  //   value: [] as string[]
  // })

  const cardInit = [
    {
      color: 'white',
      border: 'none',
      background: '#202020',
      'border-radius': '8px',
      'box-shadow': 'none'
    },
    {
      color: 'black',
      border: 'none',
      background: 'white',
      'border-radius': '8px',
      'box-shadow': 'none'
    },
    {
      color: 'black',
      border: 'none',
      background:
        'linear-gradient(38deg, rgba(255,246,161,1) 0%, rgba(255,177,177,1) 77%, rgba(186,211,249,1) 100%)',
      'border-radius': '8px',
      'box-shadow': 'rgb(204, 204, 204) 0 0 8px 2px'
    }
  ]

  const cardsStyle = ref(cardInit)

  const atualCardSyle = ref(cardInit[0])

  const setCardStyle = (index: number) => {
    atualCardSyle.value = cardsStyle.value[index]
  }

  // const updateCards = () => {
  //   cardsStyle.value = cardStyleApi.read()
  // }

  // watch(history, updateCards, { deep: true })

  return {
    cardsStyle,
    atualCardSyle,
    setCardStyle
  }
})
