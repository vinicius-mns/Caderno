import { defineStore } from 'pinia'

export type IAboutRoute =
  | 'what-is'
  | 'what-for'
  | 'how-to-use'
  | 'why-use'
  | 'where-data-goes'
  | 'how-to-create-account'

export type ICard = '/cards'

export const useAbout = defineStore('useLocalRoutes', () => {
  const x = 'nada'
  return {
    x
  }
})
