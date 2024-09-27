// import { defineStore } from 'pinia'
// import { reactive } from 'vue'
// import { CardsFilterApiLocal } from './CardsFilterApiLocal'
// import type { ICardsFilterDb, TypeOfTags } from './interfaces'

// export const useCardsFilter = defineStore('cardsFilter', () => {
//   const apiCardsFilter = new CardsFilterApiLocal()

//   const filterValues = reactive<ICardsFilterDb>({
//     includeTags: [] as unknown as string[],
//     excludeTags: [] as unknown as string[],
//     text: ''
//   })

//   const filterMethods = (type: TypeOfTags) => {
//     const addToFilter = async (tagId: string) => {
//       const newDb = await apiCardsFilter[type].addToFilter(tagId)
//       if (newDb !== undefined) {
//         filterValues.includeTags = newDb.includeTags
//         filterValues.excludeTags = newDb.excludeTags
//       }
//     }
//     const removeToFilter = async (tagId: string) => {
//       const newTags = await apiCardsFilter[type].removeToFilter(tagId)
//       if (newTags !== undefined) filterValues[type] = newTags
//     }
//     const clear = async () => {
//       const newTags = await apiCardsFilter[type].clear()
//       if (newTags !== undefined) filterValues[type] = newTags
//     }
//     const alreadyFiltred = async (tagId: string) => {
//       const isFiltred = await apiCardsFilter[type].alreadyFiltred(tagId)
//       return isFiltred
//     }
//     return {
//       addToFilter,
//       removeToFilter,
//       clear,
//       alreadyFiltred
//     }
//   }

//   // chamado no @/app para iniciar o card atual
//   const init = async () => {
//     filterValues.includeTags = await apiCardsFilter.includeTags.getTags()
//     filterValues.excludeTags = await apiCardsFilter.excludeTags.getTags()
//   }

//   return {
//     filterValues,
//     filterMethods,
//     init
//   }
// })
