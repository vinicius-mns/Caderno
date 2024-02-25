<script setup lang="ts">
import { reactive } from 'vue'
import type { ICard, ITag } from '@/api/local'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitch from './TagWithSwitch.vue'
import TagsList from './TagsList.vue'

const props = defineProps<{ card: ICard; unicName: string; emitTags: boolean }>()

const emit = defineEmits<{
  (e: 'emitTags', v: string[]): void
}>()

const cardsTags = useHandleCardsTags()

const tagsChecked = reactive({
  value: props.card.tags,
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
  emitOrUpdate: () => {
    if (!props.emitTags) cardsTags.cardsReactive.update({ ...props.card, tags: tagsChecked.value })
    if (props.emitTags) emit('emitTags', tagsChecked.value)
  },
  handle: (e: { tagId: string; checked: boolean }) => {
    const addOrRemove = e.checked === true ? 'addOnList' : 'removeOnList'
    tagsChecked[addOrRemove](e.tagId)
    tagsChecked.emitOrUpdate()
  }
})

const tags = reactive({
  value: [] as ITag[],
  setTags: (e: ITag[]) => {
    tags.value = e
  }
})
</script>

<template>
  <TagsList @emit-tags="tags.setTags" :search-id="props.unicName">
    <TagWithSwitch
      v-for="(tag, i) in tags.value"
      :key="i"
      :tag="tag"
      :checked="tagsChecked.isChecked(tag.id)"
      :unic-name="props.unicName"
      @emit-tag="tagsChecked.handle"
    />
  </TagsList>
</template>

<style scoped lang="scss"></style>
