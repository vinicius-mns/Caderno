import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWindows = defineStore('windows', () => {
  const window = () => {
    const value = ref(false)
    const open = () => (value.value = true)
    const close = () => (value.value = false)
    return { value, open, close }
  }

  const tagsWindow = window()
  const tagCreateWindow = window()
  const tagDeleteWindow = window()
  const tagUpdateWindow = window()
  const tagDeleteCardsWindow = window()
  const filterCardsWindow = window()
  const CardCreateWindow = window()
  const MenuWindow = window()

  return {
    tagsWindow,
    tagDeleteWindow,
    tagUpdateWindow,
    tagDeleteCardsWindow,
    tagCreateWindow,
    filterCardsWindow,
    CardCreateWindow,
    MenuWindow
  }
})
