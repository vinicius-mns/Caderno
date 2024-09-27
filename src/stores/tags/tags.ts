import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TagsApiLocal } from './ApiLocalTags'
import type { Itag, TypeOfTags } from './Interfaces'

const tagsApi = new TagsApiLocal()

export const useTags = defineStore('tags', () => {
  const tags = ref<Itag[]>([])

  const includeTags = ref<Itag[]>([])

  const excludeTags = ref<Itag[]>([])

  const getNames = (tags: Itag[]) => tags.map((tag) => tag[1])

  // chamado no app para iniciar os valores reativos
  const init = async () => {
    try {
      const [tagsDb, includeTagsDb, excludeTagsDb] = await Promise.all([
        tagsApi.readAllTags(),
        tagsApi.filter('includeTags').getTags(),
        tagsApi.filter('excludeTags').getTags()
      ])

      if (tagsDb) tags.value = tagsDb

      if (includeTagsDb) includeTags.value = includeTagsDb

      if (excludeTagsDb) excludeTags.value = excludeTagsDb
    } catch (e) {
      console.error(e)
    }
  }

  const createTag = async (param: { emoji: string; name: string }) => {
    const { emoji, name } = param

    const created = await tagsApi.createTag({ emoji, name })

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

  const readAllTags = async () => {
    try {
      const allTags = await tagsApi.readAllTags()

      return allTags
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

  // const getTagsById = (ids: string[]) => {
  //   const tagsFind = tags.value.filter(({ id }) => ids.includes(id))
  //   return tagsFind
  // }

  const filter = (type: TypeOfTags) => {
    const tagFilter = tagsApi.filter(type)

    const updateFilter = async () => {
      try {
        const [includeTagsDb, excludeTagsDb] = await Promise.all([
          tagsApi.filter('includeTags').getTags(),
          tagsApi.filter('excludeTags').getTags()
        ])

        if (includeTagsDb) includeTags.value = includeTagsDb

        if (excludeTagsDb) excludeTags.value = excludeTagsDb
      } catch (e) {
        console.error(e)
      }
    }

    const addTofilter = async (name: string) => {
      try {
        await tagFilter.addToFilter(name)
        await updateFilter()
      } catch (e) {
        console.error(e)
      }
    }

    const removeToFilter = async (name: string) => {
      try {
        await tagFilter.removeToFilter(name)
        await updateFilter()
      } catch (e) {
        console.error(e)
      }
    }

    const clear = async () => {
      try {
        await tagFilter.clear()
        await updateFilter()
      } catch (e) {
        console.error(e)
      }
    }

    return {
      addTofilter,
      removeToFilter,
      clear
    }
  }

  return {
    init,
    tags,
    includeTags,
    excludeTags,
    getNames,
    createTag,
    readAllTags,
    readTag,
    updateTag,
    deletedTag,
    filter
  }
})
