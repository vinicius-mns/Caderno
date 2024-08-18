import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiLocalStylesCard from './ApiLocalStylesCard'

export const useStylesCard = defineStore('stylesCard', () => {
  const apiStylesCard = new ApiLocalStylesCard()

  const atualStyle = ref({ name: 'null' })

  const allStyles = ref([{ name: 'null' }])

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
