import { defineStore } from 'pinia'
import * as emoji from 'node-emoji'
import { ref } from 'vue'

export const useEmoji = defineStore('emoji', () => {
  const initialEmojis = () => {
    return emoji.search('').map(({ emoji }) => emoji)
  }

  const allEmojis = ref<string[]>(initialEmojis())

  const getAll = (name = '') => {
    return emoji.search(name.toLocaleLowerCase()).map(({ emoji }) => emoji)
  }

  const filterEmojiByName = (name: string) => {
    const emojis = emoji.search(name.toLocaleLowerCase()).map(({ emoji }) => emoji)
    allEmojis.value = emojis
  }

  return {
    allEmojis,
    filterEmojiByName,
    getAll
  }
})
