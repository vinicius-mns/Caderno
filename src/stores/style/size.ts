import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface ISize {
  font: {
    h1: string
    h2: string
    p: string
  }
  button: {
    heigth: {
      g: string
      m: string
      p: string
    }
  }
  screen: 'desktop' | 'tablet' | 'mobile'
}

export const useSize = defineStore('styleSize', () => {
  const store: ISize = reactive({
    font: {
      h1: '',
      h2: '',
      p: ''
    },
    button: {
      heigth: {
        g: '',
        m: '',
        p: ''
      }
    },
    screen: 'desktop'
  })

  /**
   * Usar a medida de largura da tela para definir:
   * store.screen = 'mibile' | 'tablet' | 'desktop'
   */
  const defineSizeScreen = () => {
    const widthScreen = window.innerWidth
    if (widthScreen < 768) store.screen = 'mobile'
    if (widthScreen >= 768) store.screen = 'tablet'
    if (widthScreen >= 1024) store.screen = 'desktop'
  }

  return {
    store,
    defineSizeScreen
  }
})
