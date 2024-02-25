<script setup lang="ts">
import { reactive } from 'vue'
import TagWithOptions from './TagWithOptions.vue'
import TagsList from './TagsList.vue'
import type { ITag } from '@/api/local'

const tags = reactive({
  value: [] as ITag[],
  setTags: (e: ITag[]) => {
    tags.value = e
  }
})
</script>

<template>
  <TagsList @emit-tags="tags.setTags" search-id="search-tags-with-options" class="tags">
    <TagWithOptions v-for="(tag, i) in tags.value" :key="i" :tag="tag" />
  </TagsList>
</template>

<style scoped lang="scss"></style>
