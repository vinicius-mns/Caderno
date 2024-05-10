import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStyle = defineStore('style-global', () => {
  const optionsStyle = [
    {
      color: {
        text: 'white',
        one: '#181818',
        two: '#191919',
        three: '#202020',
        four: '#282828'
      },
      boxShadow: '',
      border: 'solid 1px rgb(116, 116, 116)',
      borderRadius: {
        one: '8px',
        two: '12px',
        trhee: '14px'
      }
    }
  ]
  // {
  //   'color-text': 'white',
  //   'button-bgColor': '#313131',
  //   'page-bgColor': '#191919',
  //   'component.bgColor': '#202020',
  //   'color-neutral': '#848484'
  //   'hover-Color': '#424242',
  //   color.background = '#181818'
  //   color.base = '#272727'
  //   color.highlight = '#3C3C3C'
  // }

  const atualStyle = ref(optionsStyle[0])

  return {
    atualStyle
  }
})
