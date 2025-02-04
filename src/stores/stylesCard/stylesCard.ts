import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiLocalStylesCard from './ApiLocalStylesCard'
import type { IStyleCard } from './Interfaces'

const apiStylesCard = new ApiLocalStylesCard()

export const useStylesCard = defineStore('stylesCard', () => {
  const atualStyle = ref<IStyleCard>({ name: 'null' })

  const allStyles = ref<IStyleCard[]>([{ name: 'null' }])

  const setStyle = async (name: string) => {
    const set = await apiStylesCard.setCardStyle(name)
    if (set) {
      atualStyle.value = await apiStylesCard.getAtualCardStyle()
    }
  }

  // chamado no @/app para iniciar o card atual
  const init = async () => {
    atualStyle.value = await apiStylesCard.getAtualCardStyle()
    allStyles.value = await apiStylesCard.getAllStyles()
  }

  return {
    atualStyle,
    allStyles,
    setStyle,
    init
  }
})
