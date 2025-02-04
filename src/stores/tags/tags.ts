import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { TagsApiLocal } from './ApiLocalTags'
import type { IFilterTags, Itag, ItagsDb } from './Interfaces'

const tagsApi = new TagsApiLocal()

export const useTags = defineStore('tags', () => {
  const emptyTagsDb: ItagsDb = {
    filter: { includeTags: [], excludeTags: [] },
    tags: []
  }

  const textFilterTags = ref<string>('')

  const tagsDb = reactive<ItagsDb>(emptyTagsDb)

  const tags = ref<Itag[]>([])

  const includeTags = computed(() => tagsDb.filter.includeTags)

  const excludeTags = computed(() => tagsDb.filter.excludeTags)

  const getNames = (tags: Itag[]) => tags.map((tag) => tag[1])

  // chamado no app para iniciar os valores reativos
  const init = async () => {
    try {
      const db = await tagsApi.readAllTags()

      tagsDb.filter = db.filter
      tagsDb.tags = db.tags
      tags.value = db.tags
    } catch (e) {
      console.error(e)
    }
  }

  const createTag = async (param: { emoji: string; name: string }) => {
    const { emoji, name } = param

    const created = await tagsApi.createTag({ emoji, name })

    if (created) init()
  }

  const createManyTags = async (param: { emoji: string; name: string }[]) => {
    const created = await tagsApi.createManyTags(param)

    if (created) init()
  }

  const readTag = async (name: string) => {
    try {
      const tag = await tagsApi.readTag(name)

      return tag
    } catch (e) {
      console.error(e)
    }
  }

  const readAllTags = async (name?: string) => {
    try {
      const db = await tagsApi.readAllTags(name)

      if (name) textFilterTags.value = name

      tagsDb.filter = db.filter
      tagsDb.tags = db.tags
      tags.value = db.tags
    } catch (e) {
      console.error(e)
    }
  }

  const updateTag = async (param: { emoji: string; name: string; atualName: string }) => {
    const { emoji, name, atualName } = param

    const updated = await tagsApi.updateTag({ emoji, name, atualName })

    if (updated) init()
  }

  const deletedTag = async (name: string) => {
    try {
      const deleted = await tagsApi.deleteTag(name)

      if (deleted) init()
    } catch (e) {
      console.error(e)
    }
  }

  const setFilter = async (filter: IFilterTags) => {
    try {
      await tagsApi.setFilter(filter)

      init()
    } catch (e) {
      console.error(e)
    }
  }

  const clearFilter = async () => {
    try {
      await tagsApi.clearFilter()

      init()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    init,
    textFilterTags,
    tags,
    includeTags,
    excludeTags,
    getNames,
    createTag,
    createManyTags,
    readAllTags,
    readTag,
    updateTag,
    deletedTag,
    setFilter,
    clearFilter
  }
})
