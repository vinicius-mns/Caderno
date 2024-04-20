// import { cardLocal, tagsApi, type ICard, type ITag } from '@/api/local'
// import { defineStore } from 'pinia'
// import { reactive } from 'vue'
// import lzString from 'lz-string'

// export interface ICardTag {
//   id: string
//   content: string
//   date: Date
//   tags: ITag[]
// }

// export const useHandleCardsTags = defineStore('handle cards tags', () => {
//   const cards = cardLocal()
//   const tags = tagsApi()

//   const messageError = (message: string) => {
//     console.log(message)
//   }

//   const getCardsInLocalStorage = (): ICard[] => {
//     const allCards = cards.readAll()
//     const sucess = allCards.status === 200
//     const cardsInStorage = JSON.parse(allCards.data) as ICard[]
//     if (sucess) return cardsInStorage.reverse()
//     return [
//       {
//         id: '1',
//         content: 'Nenhum card criado',
//         date: new Date(),
//         tags: ['']
//       }
//     ]
//   }

//   const getTagsInLocalStorage = (): ITag[] => {
//     const allTags = tags.readAll()
//     const sucess = allTags.status === 200
//     if (sucess) return JSON.parse(allTags.data) as ITag[]
//     return [
//       {
//         content: 'Crie uma tag',
//         emoji: '',
//         id: ''
//       }
//     ]
//   }

//   const cardsFiltredByTags = reactive({
//     value: {
//       tagsId: [] as string[],
//       type: 'some' as 'some' | 'every'
//     },
//     setFilter: (tagsId: string[], type: 'some' | 'every') => {
//       cardsFiltredByTags.value.tagsId = tagsId
//       cardsFiltredByTags.value.type = type
//       cardsReactive.setValue(getCardsInLocalStorage())
//     },
//     resetFilter: () => {
//       cardsFiltredByTags.value.tagsId = [] as string[]
//       cardsFiltredByTags.value.type = 'some'
//       cardsReactive.setValue(getCardsInLocalStorage())
//     },
//     filter: (allCards: ICard[]) => {
//       const tagsId = cardsFiltredByTags.value.tagsId
//       const type = cardsFiltredByTags.value.type
//       return allCards.filter((card) => tagsId[type]((tag) => card.tags.includes(tag)))
//     },
//     filterAndReturn: (tagsId: string[], type: 'some' | 'every') => {
//       const allCards = getCardsInLocalStorage()
//       return allCards.filter((card) => tagsId[type]((tag) => card.tags.includes(tag)))
//     }
//   })

//   const cardsReactive = reactive({
//     value: getCardsInLocalStorage(),
//     setValue: (newCards: ICard[]) => {
//       if (cardsFiltredByTags.value.tagsId.length > 0) {
//         const filtred = cardsFiltredByTags.filter(newCards)
//         cardsReactive.value = filtred
//       } else {
//         cardsReactive.value = newCards
//       }
//     },
//     create: (card: ICard) => {
//       const created = cards.create({ ...card, date: new Date() })
//       const sucess = created.status === 201
//       if (sucess) cardsReactive.setValue(getCardsInLocalStorage())
//       if (!sucess) messageError(created.data)
//     },
//     read: (id: string) => {
//       const readCard = cards.readOne(id)
//       const sucess = readCard.status === 200
//       if (sucess) return JSON.parse(readCard.data)
//       if (!sucess) messageError(readCard.data)
//     },
//     update: (card: ICard) => {
//       const updated = cards.update(card.id, { ...card, date: new Date(card.date) })
//       const sucess = updated.status === 200
//       if (sucess) cardsReactive.setValue(getCardsInLocalStorage())
//       if (!sucess) messageError(updated.data)
//     },
//     delete: (id: string) => {
//       const deleteCard = cards.delete(id)
//       const sucess = deleteCard.status === 200
//       if (sucess) cardsReactive.setValue(getCardsInLocalStorage())
//       if (!sucess) messageError(deleteCard.data)
//     },
//     withTagsObject: (listOfCards?: ICard[]): ICardTag[] => {
//       const _cards = listOfCards ? listOfCards : cardsReactive.value
//       return _cards.map((card) => ({
//         ...card,
//         tags: card.tags.map((tagId) => tagsReactive.read(tagId) as ITag)
//       }))
//     }
//   })

//   const tagsReactive = reactive({
//     value: getTagsInLocalStorage(),
//     setValue: (newTags: ITag[]) => {
//       tagsReactive.value = newTags
//     },
//     create: (tag: ITag) => {
//       const created = tags.create(tag)
//       const sucess = created.status === 201
//       if (sucess) tagsReactive.setValue(getTagsInLocalStorage())
//       if (!sucess) messageError(created.data)
//     },
//     read: (id: string) => {
//       const tag = tags.readOne(id)
//       const sucess = tag.status === 200
//       if (sucess) return JSON.parse(tag.data) as unknown as ITag
//       if (!sucess) messageError(tag.data)
//     },
//     update: (tag: ITag) => {
//       const updated = tags.update(tag.id, tag)
//       const sucess = updated.status === 200
//       if (sucess) {
//         tagsReactive.setValue(getTagsInLocalStorage())
//         cardsReactive.setValue(getCardsInLocalStorage())
//       }
//       if (!sucess) messageError(updated.data)
//     },
//     delete: (id: string, cardsFiltred: ICard[]) => {
//       const deleteTag = tags.delete(id)
//       const sucess = deleteTag.status === 200
//       if (sucess) {
//         const deleteTagOnCards = () => {
//           const removedTag = (tags: string[]) => tags.filter((tagId) => tagId !== id)
//           cardsFiltred.forEach((cardWithTag) =>
//             cardsReactive.update({ ...cardWithTag, tags: removedTag(cardWithTag.tags) })
//           )
//         }
//         deleteTagOnCards()
//         tagsReactive.setValue(getTagsInLocalStorage())
//       }
//       if (!sucess) messageError(deleteTag.data)
//     }
//   })

//   const exportData = () => {
//     const allCards = getCardsInLocalStorage()
//     const allTags = getTagsInLocalStorage()
//     const data = lzString.compressToUTF16(
//       JSON.stringify({
//         cards: allCards,
//         tags: allTags
//       })
//     )
//     return data
//   }

//   const importData = (compressString: string) => {
//     const data = lzString.decompressFromUTF16(compressString)
//     const toObject = JSON.parse(data) as { cards: ICard[]; tags: ITag[] }
//     localStorage.setItem(tags.key, JSON.stringify(toObject.tags))
//     localStorage.setItem(cards.key, JSON.stringify(toObject.cards))
//     tagsReactive.setValue(toObject.tags)
//     cardsReactive.setValue(toObject.cards)
//     return toObject
//   }

//   return {
//     cardsReactive,
//     tagsReactive,
//     cardsFiltredByTags,
//     exportData,
//     importData
//   }
// })
