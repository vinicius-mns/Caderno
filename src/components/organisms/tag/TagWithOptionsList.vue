<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagWithOptions from './TagWithOptions.vue'

const props = defineProps<{ allTags: ITag[] }>()
</script>

<template>
  <div class="tag-with-options-list dinamic-scroll">
    <TagWithOptions v-for="(tag, i) in props.allTags" :key="i" :tag="tag" />
  </div>
</template>

<style scoped lang="scss">
.tag-with-options-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
@media screen and (min-width: 768px) {
  .dinamic-scroll {
    scrollbar-gutter: stable;
    overflow: hidden;
    &:hover {
      overflow: auto;
    }
  }
}
</style>
