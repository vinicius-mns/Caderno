// import LocalStorageApi from '@/myLocalStorage/LocalStorageApi'
// import { defineStore } from 'pinia'
// import { ref, watch } from 'vue'

// export type Ikey = string

// export type IWhere = 'include' | 'exclude'

// export type IMethod =
//   | 'hasTag'
//   | 'addTag'
//   | 'removeTag'
//   | 'removeIfHaveTag'
//   | 'addOrRemoveTag'
//   | 'clear'

// export interface ICardsFilter {
//   includeTags: string[]
//   excludeTags: string[]
//   text: string
// }

// const keyStorage = 'cards_filter'
// const defaulCardsFilter = {
//   includeTags: [] as string[],
//   excludeTags: [] as string[],
//   text: ''
// }

// const handleError = {
//   verifyString: (item: string) => {
//     if (typeof item !== 'string') throw new Error(`${item} not a string`)
//   },
//   verifyStringList: (listOfString: string[]) => {
//     listOfString.forEach((item) => handleError.verifyString(item))
//   }
// }

// const filterHistory = () => {
//   const history = ref<{ where: IWhere; method: IMethod; tagId: string }[]>([])

//   const push = (where: IWhere, method: IMethod, tagId: string) => {
//     const atualHistory = history.value
//     if (atualHistory.length >= 5) atualHistory.shift()
//     atualHistory.push({ where, method, tagId })
//     history.value = atualHistory
//   }

//   const getLast = () => {
//     return history.value[history.value.length - 1]
//   }

//   return {
//     value: history,
//     push,
//     getLast
//   }
// }

// const handleTags = (props: {
//   init: string[]
//   where: IWhere
//   history: ReturnType<typeof filterHistory>
// }) => {
//   const tags = ref<string[]>(props.init)

//   const hasTag = (id: string) => {
//     handleError.verifyString(id)
//     return tags.value.includes(id)
//   }

//   const addTag = (id: string) => {
//     handleError.verifyString(id)
//     props.history.push(props.where, 'addTag', id)
//     tags.value = [...tags.value, id]
//   }

//   const removeTag = (id: string) => {
//     handleError.verifyString(id)
//     props.history.push(props.where, 'removeTag', id)
//     tags.value = tags.value.filter((tagId) => tagId !== id)
//   }

//   const removeIfHaveTag = (id: string) => {
//     handleError.verifyString(id)
//     if (hasTag(id)) removeTag(id)
//   }

//   const addOrRemoveTag = (id: string) => {
//     handleError.verifyString(id)
//     if (hasTag(id)) {
//       removeTag(id)
//     } else {
//       addTag(id)
//     }
//   }

//   const clear = () => (tags.value = [])

//   return {
//     hasTag,
//     removeTag,
//     addTag,
//     addOrRemoveTag,
//     clear,
//     removeIfHaveTag,
//     tags
//   }
// }

// const cardsFilterStore = new LocalStorageApi<ICardsFilter>(defaulCardsFilter, keyStorage)

// export const useCardsFilter = defineStore(keyStorage, () => {
//   const history = filterHistory()

//   const include = handleTags({
//     init: cardsFilterStore.read().includeTags,
//     where: 'include',
//     history: history
//   })

//   const exclude = handleTags({
//     init: cardsFilterStore.read().excludeTags,
//     where: 'exclude',
//     history: history
//   })

//   const removeTagFromOtherSide = () => {
//     const lastHistory = history.getLast()
//     if (lastHistory.method === 'addTag') {
//       if (lastHistory.where === 'include') exclude.removeIfHaveTag(lastHistory.tagId)
//       if (lastHistory.where === 'exclude') include.removeIfHaveTag(lastHistory.tagId)
//     }
//   }

//   const saveInLocalStorage = () => {
//     cardsFilterStore.read().includeTags = include.tags.value
//     cardsFilterStore.read().excludeTags = exclude.tags.value
//     cardsFilterStore.setAndReturn({
//       ...cardsFilterStore.read(),
//       includeTags: include.tags.value,
//       excludeTags: exclude.tags.value
//     })
//   }

//   const update = () => {
//     removeTagFromOtherSide()
//     saveInLocalStorage()
//   }

//   watch(history.value, update, { deep: true })

//   return {
//     include,
//     exclude,
//     history
//   }
// })
