import { defineStore } from 'pinia'
import * as emoji from 'node-emoji'

export const useEmoji = defineStore('emoji', () => {
  const getAll = (name = '') => {
    return emoji.search(name.toLocaleLowerCase()).map(({ emoji }) => emoji)
  }

  return {
    getAll
  }
})
