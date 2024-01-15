import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStyle = defineStore('style', () => {
  const style = reactive({
    button: {
      bgColor: '#313131',
      hoverColor: '#424242',
      textColor: 'white',
      size: {
        p: '28px',
        m: '32px',
        g: '38px'
      }
    },
    component: {
      bgColor: '#202020'
    },
    page: {
      bgColor: '#191919'
    }
  })

  return {
    style
  }
})
