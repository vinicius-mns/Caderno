<script setup lang="ts">
import { computed, reactive } from 'vue'
import TagWithSwitch from './TagWithSwitch.vue'
import { useTags } from '@/stores/local/tags'

const tags = useTags()

const props = defineProps<{ checkeds: string[]; unicName: string; direction: 'column' | 'row' }>()

const emit = defineEmits<{
  (e: 'emitTags', v: string[]): void
}>()

const tagsChecked = reactive({
  value: props.checkeds,
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
  // emitOrUpdate: () => {
  //   emit('emitTags', tagsChecked.value)
  // },
  handle: (e: { tagId: string; checked: boolean }) => {
    const addOrRemove = e.checked === true ? 'addOnList' : 'removeOnList'
    tagsChecked[addOrRemove](e.tagId)
    // tagsChecked.emitOrUpdate()
    emit('emitTags', tagsChecked.value)
  }
})

const allTags = computed(() => tags.tags)
</script>

<template>
  <div :class="[props.direction, 'tag-with-switch-list']">
    <TagWithSwitch
      v-for="(tag, i) in allTags"
      :key="i"
      :tag="tag"
      :checked="tagsChecked.isChecked(tag.id)"
      :unic-name="props.unicName"
      @emit-tag="tagsChecked.handle"
      class="tag"
    />
  </div>
</template>

<style scoped lang="scss">
$margin: 10px;
.row {
  flex-direction: row;
  & .tag {
    width: 100px;
    flex-shrink: 0;
    margin-left: $margin;
    margin-right: $margin;
  }
}
.column {
  flex-direction: column;
  overflow: auto;
}
.tag-with-switch-list {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
