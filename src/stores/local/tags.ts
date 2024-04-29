import { tagsLocalDb } from '@/api/api_local/entites/tags/Tags_api'
import type { ITag } from '@/api/local'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

export const useTags = defineStore('tags', () => {
  const tagsLocalApi = tagsLocalDb()

  const filter = reactive({
    text: ''
  })

  const history = reactive({
    value: [] as string[]
  })

  const _updateHistory = (message: string) => {
    const newHistory = [...history.value, message]
    if (newHistory.length >= 5) newHistory.shift()
    history.value = newHistory
  }

  const tags = ref(tagsLocalApi.read())

  const createOne = (card: ITag) => {
    tagsLocalApi.createOne(card)
    _updateHistory('Criar nova tag')
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
    _updateHistory('Atualizar tag')
  }

  const deleteOne = (id: string) => {
    tagsLocalApi.deleteOne(id)
    _updateHistory('Deletar tag')
  }

  const filterText = (text: string) => {
    filter.text = text
    _updateHistory('pesquisa tag')
  }

  const filterChain = (tags: ITag[]) => {
    const byText = tagsLocalApi.searchTag(filter.text, tags)
    return byText
  }

  const updateTags = () => {
    const allTags = tagsLocalApi.read()
    const filtredChain = filterChain(allTags)
    tags.value = filtredChain
  }

  watch(history, updateTags, { deep: true })

  return {
    tags,
    updateTags,
    createOne,
    readOne,
    updateOne,
    readList,
    deleteOne,
    filterText
  }
})
