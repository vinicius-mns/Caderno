<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { ICard } from '@/api/local'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitch from './TagWithSwitch.vue'

const cardsTags = useHandleCardsTags()

const props = defineProps<{ card: ICard; unicName: string; emitTags: boolean }>()

const emit = defineEmits<{
  (e: 'emitTags', v: string[]): void
}>()

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

const tags = computed(() => cardsTags.tagsReactive.value)

// const tags = reactive({
//   value: [] as ITag[],
//   setTags: (e: ITag[]) => {
//     tags.value = e
//   }
// })
</script>

<template>
  <div class="tag-with-switch-list">
    <TagWithSwitch
      v-for="(tag, i) in tags"
      :key="i"
      :tag="tag"
      :checked="tagsChecked.isChecked(tag.id)"
      :unic-name="props.unicName"
      @emit-tag="tagsChecked.handle"
    />
  </div>
</template>

<style scoped lang="scss">
.tag-with-switch-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
