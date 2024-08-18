// export interface ICardsFilterDb {
//   includeTags: string[]
//   excludeTags: string[]
//   text: string
// }

// export type TypeOfTags = 'includeTags' | 'excludeTags'

// export interface ITagsMethods {
//   getTags: () => Promise<string[]>
//   addToFilter: (id: string) => Promise<ICardsFilterDb | undefined>
//   removeToFilter: (id: string) => Promise<string[] | undefined>
//   clear: () => Promise<string[] | undefined>
//   alreadyFiltred: (id: string) => Promise<boolean>
// }

// export interface ICardsFilterApi {
//   includeTags: ITagsMethods
//   excludeTags: ITagsMethods
//   // text: () => {
//   //   getText: () => Promise<string>
//   //   setText: () => Promise<boolean>
//   // }
// }
