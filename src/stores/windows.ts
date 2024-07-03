import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

type IShow =
  | ''
  | 'Criar card'
  | 'Editar card'
  | 'Deletar card'
  | 'Criar tag'
  | 'Editar tag'
  | 'Deletar cards com tag'
  | 'Deletar tag'
  | 'Configurações'

interface IProps {
  cardProps: ICard
  tagProps: ITag
}

export const useWindows = defineStore('windows', () => {
  const opened = ref(false)
  const show = ref<IShow>('')

  const props = reactive<IProps>({
    cardProps: { content: '', date: new Date(), id: '404', tags: [] },
    tagProps: { content: '', emoji: '', id: '' }
  })

  const close = () => (opened.value = false)

  const open = {
    cardCreate: () => {
      opened.value = true
      show.value = 'Criar card'
    },
    cardUpdate: (card: ICard) => {
      props.cardProps = card
      opened.value = true
      show.value = 'Editar card'
    },
    cardDelete: (card: ICard) => {
      props.cardProps = card
      opened.value = true
      show.value = 'Deletar card'
    },
    tagCreate: (tag: ITag) => {
      props.tagProps = tag
      opened.value = true
      show.value = 'Criar tag'
    },
    tagUpdate: (tag: ITag) => {
      props.tagProps = tag
      opened.value = true
      show.value = 'Editar tag'
    },
    tagDeleteCards: (tag: ITag) => {
      props.tagProps = tag
      opened.value = true
      show.value = 'Deletar cards com tag'
    },
    tagDelete: (tag: ITag) => {
      props.tagProps = tag
      opened.value = true
      show.value = 'Deletar tag'
    },
    config: () => {
      opened.value = true
      show.value = 'Configurações'
    }
  }

  return {
    opened,
    props,
    show,
    open,
    close
  }
})
