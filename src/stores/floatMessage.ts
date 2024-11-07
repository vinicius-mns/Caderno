import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFloatMessage = defineStore('float message', () => {
  const show = ref(false)

  const _open = () => (show.value = true)

  const _close = () => (show.value = false)

  const message = ref<string>('')

  const messages = {
    cardCreateSucess: 'Card criado',
    cardUpdateSucess: 'Card atulizado',
    cardDeleteSucess: 'Card deletado',
    cardsDeleteSucess: 'Carsd deletados',
    cardCopySucess: 'Card copiado',
    tagCreateSucess: 'Tag criada',
    tagUpdateSucess: 'Tag tualizada',
    tagDeleteSucess: 'Tag deletada',
    tagClearFilterSucess: 'Filtro limpo',
    tagsFilterSucess: 'Filtro Ativo'
  }

  const openMessage = (m: string) => {
    message.value = m

    const timeToClose = 1000

    _open()

    setTimeout(() => {
      _close()
      message.value = ''
    }, timeToClose)
  }

  return {
    show,
    message,
    messages,
    openMessage
  }
})
