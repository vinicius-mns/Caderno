<script setup lang="ts">
import { reactive } from 'vue'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitch from '../tag/TagWithSwitch.vue'
import type { ITag } from '@/api/local'

const cardsTags = useHandleCardsTags()

const tags = reactive({
  value: [] as ITag[],
  setValue: (tagList: ITag[]) => (tags.value = tagList)
})

const tagsChecked = reactive({
  value: [] as string[],
  addOnList: (tagId: string) => {
    const insertTag = [...tagsChecked.value, tagId]
    tagsChecked.value = insertTag
  },
  removeOnList: (tagId: string) => {
    const removedTag = tagsChecked.value.filter((id) => id !== tagId)
    tagsChecked.value = removedTag
  },
  isChecked: (tagId: string) => {
    return tagsChecked.value.includes(tagId)
  },
  handle: (e: { tagId: string; checked: boolean }) => {
    const addOrRemove = e.checked === true ? 'addOnList' : 'removeOnList'
    tagsChecked[addOrRemove](e.tagId)
    cardsTags.cardsFiltredByTags.setFilter(tagsChecked.value, 'every')
  }
})

const modal = reactive({
  show: false,
  open: () => (modal.show = true),
  close: () => (modal.show = false)
})
</script>

<template>
  <div class="card-filter-tag-list">
    <TagWithSwitch
      class="tag"
      v-for="(tag, i) in tags.value"
      :key="i"
      :tag="tag"
      :checked="tagsChecked.isChecked(tag.id)"
      unic-name="filter-by-tag"
      @emit-tag="tagsChecked.handle"
    />
  </div>
</template>

<style scoped lang="scss">
.card-filter-tags-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: auto;
}
</style>
