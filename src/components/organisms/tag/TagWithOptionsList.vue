<script setup lang="ts">
import { computed, reactive } from 'vue'
import TagWithOptions from './TagWithOptions.vue'
import type { ITag } from '@/api/local'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'

const { tagsReactive } = useHandleCardsTags()

const allTags = computed(() => tagsReactive.value)

const tags = reactive({
  value: [] as ITag[],
  setTags: (e: ITag[]) => {
    tags.value = e
  }
})
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
