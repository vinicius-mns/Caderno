<script setup lang="ts">
import { ref } from 'vue'
import TagSwitchDouble from './TagSwitchDouble.vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useCards } from '@/stores/local/cards'

const cards = useCards()

const props = defineProps<{
  allTags: ITag[]
  direction: 'column' | 'row'
}>()

const excludesTags = ref([] as string[])

const includeTags = ref([] as string[])

const handleTags = (v: { tagId: string; checked: 'l' | 'r' | 'n' }) => {
  const l = excludesTags.value
  const r = includeTags.value
  const removeTag = (list: string[]) => list.filter((item) => item !== v.tagId)
  excludesTags.value = removeTag(l)
  includeTags.value = removeTag(r)
  if (v.checked === 'l') excludesTags.value = [...excludesTags.value, v.tagId]
  if (v.checked === 'r') includeTags.value = [...includeTags.value, v.tagId]
}

const sendFilter = () => {
  cards.filterIncludeTag(includeTags.value)
  cards.filterExcludeTags(excludesTags.value)
}
</script>

<template>
  <div :class="[props.direction, 'tag-with-switch-list']">
    <TagSwitchDouble
      v-for="(tag, i) in props.allTags"
      :key="i"
      :tag="tag"
      @emit-tag="handleTags"
      class="tag"
    />
    <ThemeButton class="send-filter" @click="sendFilter">Filtrar</ThemeButton>
  </div>
</template>

<style scoped lang="scss">
$margin: 10px;
.row {
  flex-direction: row;
  & .tag {
    width: 200px;
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
  & .send-filter {
    width: 100%;
  }
}
</style>
