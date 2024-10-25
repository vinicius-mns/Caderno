import type { Itag } from '@/stores/tags/Interfaces'
import { defineStore } from 'pinia'
import { ref, type UnwrapRef } from 'vue'
import type { Icard } from './cards/Interfaces'

export const useWindows = defineStore('windows', () => {
  const newWindow = <T>(v: { title: string; props: T }) => {
    const title = v.title
    const show = ref(false)
    const props = ref<T>(v.props)

    const open = (newProps: T) => {
      props.value = newProps as UnwrapRef<T>
      show.value = true
    }

    const close = () => (show.value = false)

    return { title, show, props, open, close }
  }

  const initTag: Itag = ['', '']

  const initCard: Icard = { content: '', date: new Date(), id: '', tags: [] }

  const cardCreate = newWindow({ title: 'Criar novo card', props: initCard })

  const cardEdit = newWindow({ title: 'Editar card', props: initCard })

  const cardDelete = newWindow({ title: 'Deletar card', props: initCard })

  const tagCreate = newWindow({ title: 'Criar tag', props: null })

  const tagEditor = newWindow({ title: 'Editar tag', props: initTag })

  const tagDeleteCard = newWindow({ title: 'Deletar cards', props: initTag })

  const tagDelete = newWindow({ title: 'Deletar tag', props: initTag })

  const config = newWindow({ title: 'Configuracoes', props: null })

  const errorMessage = newWindow({ props: '', title: 'Error' })

  const errorCardNoTag = newWindow({ title: 'Nenhuma tag criada', props: null })

  return {
    cardCreate,
    cardEdit,
    cardDelete,
    tagCreate,
    tagEditor,
    tagDeleteCard,
    tagDelete,
    config,
    errorMessage,
    errorCardNoTag
  }
})
