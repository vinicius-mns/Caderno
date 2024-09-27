import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IBorderRadius, IColorPage } from './interfaces'
import ApiLocalStylesPage from './ApiLocalSytylesPage'

const apiStylesPage = new ApiLocalStylesPage()

export const useStylesPage = defineStore('stylesPag', () => {
  const allColors = async () => await apiStylesPage.getColors()

  const atualColor = ref<IColorPage>({
    name: '',
    back: '',
    border: '',
    front: '',
    hover: '',
    text: ''
  })

  const borderRadius = ref<IBorderRadius>({ inside: '', outside: '' })

  const setColor = async (name: string) => {
    const newColor = await apiStylesPage.setColor(name)
    if (newColor) atualColor.value = newColor
  }

  // chamado no @/app para iniciar styles atual
  const init = async () => {
    atualColor.value = await apiStylesPage.getAtualColor()
    borderRadius.value = await apiStylesPage.getBorderRadius()
  }

  return {
    atualColor,
    borderRadius,
    allColors,
    setColor,
    init
  }
})
