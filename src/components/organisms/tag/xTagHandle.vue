<!-- <script setup lang="ts">
import { useTags } from '@/stores/local/tags'
import TagSwitchDoubleList from './TagSwitchDoubleList.vue'
import TagWithOptionsList from './TagWithOptionsList.vue'
import { computed } from 'vue'

const tags = useTags()

const allTags = computed(() => tags.tags)
</script>

<template>
  <div class="tag-handle-container">
    <div class="tag-handle">
      <h3>Tags</h3>
      <TagSwitchDoubleList />
    </div>
    <div class="tag-handle">
      <h3>Filtrar cards</h3>
      <TagWithOptionsList :all-tags="allTags" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-handle-container {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  & .tag-handle {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style> -->
