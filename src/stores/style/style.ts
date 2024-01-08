import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStyle = defineStore('global style', () => {
  const style = reactive({
    borderRadius: '16px',
    color: {
      text1: 'black',
      text2: '',
      text3: '',
      back1: 'white',
      back2: 'black',
      back3: ''
    },
    border: ''
  })

  const lightMode = () => {}

  const darkMOde = () => {}

  return {
    style
  }
})
