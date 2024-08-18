// import type { Icard } from '@/stores/cards/Interfaces'
// import type { Itag } from '@/stores/tags/Interfaces'
// import { defineStore } from 'pinia'
// import { reactive, ref } from 'vue'

// type IShow =
//   | ''
//   | 'Criar card'
//   | 'Editar card'
//   | 'Deletar card'
//   | 'Criar tag'
//   | 'Editar tag'
//   | 'Deletar cards com tag'
//   | 'Deletar tag'
//   | 'Configurações'

// interface IProps {
//   cardProps: Icard
//   tagProps: Itag
// }

// export const useWindows = defineStore('windows', () => {
//   const opened = ref(false)
//   const show = ref<IShow>('')

//   const props = reactive<IProps>({
//     cardProps: { content: '', date: new Date(), id: '404', tags: [] },
//     tagProps: { content: '', emoji: '', id: '' }
//   })

//   const close = () => (opened.value = false)

//   const open = {
//     cardCreate: () => {
//       opened.value = true
//       show.value = 'Criar card'
//     },
//     cardUpdate: (card: Icard) => {
//       props.cardProps = card
//       opened.value = true
//       show.value = 'Editar card'
//     },
//     cardDelete: (card: Icard) => {
//       props.cardProps = card
//       opened.value = true
//       show.value = 'Deletar card'
//     },
//     tagCreate: (tag: Itag) => {
//       props.tagProps = tag
//       opened.value = true
//       show.value = 'Criar tag'
//     },
//     tagUpdate: (tag: Itag) => {
//       props.tagProps = tag
//       opened.value = true
//       show.value = 'Editar tag'
//     },
//     tagDeleteCards: (tag: Itag) => {
//       props.tagProps = tag
//       opened.value = true
//       show.value = 'Deletar cards com tag'
//     },
//     tagDelete: (tag: Itag) => {
//       props.tagProps = tag
//       opened.value = true
//       show.value = 'Deletar tag'
//     },
//     config: () => {
//       opened.value = true
//       show.value = 'Configurações'
//     }
//   }

//   return {
//     opened,
//     props,
//     show,
//     open,
//     close
//   }
// })
