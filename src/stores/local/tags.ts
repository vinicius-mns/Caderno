import { tagsApi, type ITag } from '@/api/local/Tags'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTags = defineStore('tagsLocal', () => {
  const api = tagsApi()

  const getAll = ref(JSON.parse(api.readAll().data) as unknown as ITag[])

  const _updateTags = () => {
    const all = api.readAll()

    if (all.status !== 200) {
      console.log('erro ao capturar tags')
    } else {
      getAll.value = JSON.parse(all.data)
    }
  }

  const create = (tag: ITag) => {
    try {
      api.create(tag)

      _updateTags()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getAll,
    create
  }
})
