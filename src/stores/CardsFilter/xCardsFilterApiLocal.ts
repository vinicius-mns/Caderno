// import LocalStorageApi from '@/myLocalStorage/LocalStorageApi'
// import type { ICardsFilterApi, ICardsFilterDb, TypeOfTags } from './interfaces'

// const keyLocalStorageCardsFilter = 'filter_cards'

// const cardsFilterLocalStorage = new LocalStorageApi<ICardsFilterDb>(
//   {
//     excludeTags: [],
//     includeTags: [],
//     text: ''
//   },
//   keyLocalStorageCardsFilter
// )

// export class CardsFilterApiLocal implements ICardsFilterApi {
//   constructor(private _storage = cardsFilterLocalStorage) {}

//   private _getStore = () => {
//     return new Promise<ICardsFilterDb>((resolve, reject) => {
//       setTimeout(() => {
//         const store = this._storage.read()
//         if (store) resolve(store)
//         else reject('filter tags not found')
//       }, 0)
//     })
//   }

//   private _getTags = async (type: TypeOfTags) => {
//     return (await this._getStore())[type]
//   }

//   private _addToFilter = async (typeToAdd: TypeOfTags, typeToRemove: TypeOfTags, tagId: string) => {
//     const store = await this._getStore()
//     const tagsToAdd = [...store[typeToAdd], tagId]
//     const tagsToRemove = store[typeToRemove].filter((id) => id !== tagId)
//     const newStore = {
//       ...store,
//       [typeToAdd]: tagsToAdd,
//       [typeToRemove]: tagsToRemove
//     }
//     return new Promise<ICardsFilterDb | undefined>((resolve, reject) => {
//       setTimeout(() => {
//         if (newStore) {
//           this._storage.setAndReturn(newStore)
//           resolve(newStore)
//         } else {
//           reject(`${typeToAdd} _addToFilter error`)
//         }
//       }, 0)
//     })
//   }

//   private _removeToFilter = async (type: TypeOfTags, tagId: string) => {
//     const store = await this._getStore()
//     const tags = store[type]
//     const newTags = tags.filter((id) => id !== tagId)
//     return new Promise<string[] | undefined>((resolve, reject) => {
//       setTimeout(() => {
//         if (newTags) {
//           this._storage.setAndReturn({ ...store, [type]: newTags })
//           resolve(newTags)
//         } else {
//           reject(`${type} _removeToFilter error`)
//         }
//       }, 0)
//     })
//   }

//   private _clear = async (type: TypeOfTags) => {
//     const store = await this._getStore()
//     const newTags = [] as string[]
//     return new Promise<string[] | undefined>((resolve, reject) => {
//       setTimeout(() => {
//         if (newTags) {
//           this._storage.setAndReturn({ ...store, [type]: newTags })
//           resolve(newTags)
//         } else {
//           reject(`${type} _clear error`)
//         }
//       }, 0)
//     })
//   }

//   private _alreadyFiltred = async (type: TypeOfTags, tagId: string) => {
//     const tags = await this._getTags(type)
//     const filtre = tags.includes(tagId)
//     return new Promise<boolean>((resolve, reject) => {
//       setTimeout(() => {
//         if (filtre) resolve(true)
//         else if (!filtre) resolve(false)
//         else reject(`${type} _alreadyFiltered error`)
//       }, 0)
//     })
//   }

//   public includeTags = {
//     getTags: () => this._getTags('includeTags'),
//     addToFilter: (id: string) => this._addToFilter('includeTags', 'excludeTags', id),
//     removeToFilter: (id: string) => this._removeToFilter('includeTags', id),
//     clear: () => this._clear('includeTags'),
//     alreadyFiltred: (id: string) => this._alreadyFiltred('includeTags', id)
//   }

//   public excludeTags = {
//     getTags: () => this._getTags('excludeTags'),
//     addToFilter: (id: string) => this._addToFilter('excludeTags', 'includeTags', id),
//     removeToFilter: (id: string) => this._removeToFilter('excludeTags', id),
//     clear: () => this._clear('excludeTags'),
//     alreadyFiltred: (id: string) => this._alreadyFiltred('excludeTags', id)
//   }
// }
