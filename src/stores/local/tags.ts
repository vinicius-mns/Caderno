import { tagsLocalDb } from '@/api/api_local/entites/tags/Tags_api'
import type { ITag } from '@/api/local'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTags = defineStore('tags', () => {
  const tagsLocalApi = tagsLocalDb()

  const tagx = ref(tagsLocalApi.read())

  const tags = computed(() => tagx)

  const updateTags = () => {
    tagx.value = tagsLocalApi.read()
  }

  const createOne = (card: ITag) => {
    tagsLocalApi.createOne(card)
    updateTags()
  }

  const readOne = (id: string): ITag => {
    const tag = tagsLocalApi.readOne(id)
    return tag
  }

  const readList = (ids: string[]) => {
    const list = tagsLocalApi.readList(ids)
    return list
  }

  const updateOne = (tag: ITag) => {
    tagsLocalApi.updateOne(tag.id, tag)
    updateTags()
  }

  const deleteOne = (id: string) => {
    tagsLocalApi.deleteOne(id)
    updateTags()
  }

  return {
    tags,
    updateTags,
    createOne,
    readOne,
    updateOne,
    readList,
    deleteOne
  }
})
