import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStyle = defineStore('style', () => {
  const style = reactive({
    boxShadow: '0 0 1px 1px rgba(255, 255, 255, 0.3)',
    button: {
      bgColor: '#313131',
      hoverColor: '#424242',
      textColor: 'white',
      borderRadius: '50px',
      size: '32px' // 38
    },
    component: {
      bgColor: '#202020'
    },
    page: {
      bgColor: '#191919'
    }
  })

  const defineButtonSize = (device: 'mobile' | 'desktop') => {
    const execute = {
      mobile: () => (style.button.size = '42px'),
      desktop: () => (style.button.size = '32px')
    }
    execute[device]()
  }

  const darkMode = (value: boolean) => {
    if (value) {
      style.button.textColor = 'black'
      style.button.bgColor = 'white'
      style.component.bgColor = 'white'
      style.page.bgColor = '#e6e6e6'
      style.button.hoverColor = '#e6e6e6'
      style.boxShadow = '0 0 1px 1px rgba(0, 0, 0, 0.2)'
    } else {
      style.button.textColor = 'white'
      style.button.bgColor = '#313131'
      style.component.bgColor = '#202020'
      style.page.bgColor = '#191919'
      style.button.hoverColor = '#424242'
      style.boxShadow = '0 0 1px 1px rgba(255, 255, 255, 0.3)'
    }
  }

  return {
    style,
    defineButtonSize,
    darkMode
  }
})
