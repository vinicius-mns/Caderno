import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStyle = defineStore('style-global', () => {
  const optionsStyle = [
    {
      color: {
        text: 'white',
        one: '#181818',
        two: '#202020',
        three: '#313131',
        four: '#424242'
      },
      boxShadow: '',
      border: 'solid 1px rgb(65, 65, 65)',
      borderRadius: {
        one: '8px',
        two: '12px',
        trhee: '14px'
      }
    },
    {
      color: {
        text: 'black',
        one: '#F5F5F5',
        two: '#F0F0F0',
        three: '#E5E5EA',
        four: '#FFFFFF'
      },
      boxShadow: '',
      border: 'solid 1px rgb(65, 65, 65)',
      borderRadius: {
        one: '8px',
        two: '12px',
        trhee: '14px'
      }
    },
    {
      color: {
        text: 'white',
        one: '#333333',
        two: '#444444',
        three: '#555555',
        four: '#666666'
      },
      boxShadow: '',
      border: 'solid 1px rgb(65, 65, 65)',
      borderRadius: {
        one: '8px',
        two: '12px',
        trhee: '14px'
      }
    }
  ]

  const atualStyle = ref(optionsStyle[0])

  const atualStyleSet = (n: number) => {
    atualStyle.value = optionsStyle[n]
  }

  return {
    optionsStyle,
    atualStyleSet,
    atualStyle
  }
})
