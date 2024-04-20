<script setup lang="ts">
import TagWithOptions from './TagWithOptions.vue'
import { useTags } from '@/stores/local/tags'
import { computed } from 'vue'

const tags = useTags()

const allTags = computed(() => tags.tags.value)
</script>

<template>
  <div class="tag-with-options-list dinamic-scroll">
    <TagWithOptions v-for="(tag, i) in allTags" :key="i" :tag="tag" />
  </div>
</template>

<style scoped lang="scss">
.tag-with-options-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
