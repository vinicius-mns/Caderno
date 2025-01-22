<script setup lang="ts">
import FlexContainer from '../atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagView2 from '../molecules/TagView2.vue'

const props = defineProps<{
  includeTags: Itag[]
  excludeTags: Itag[]
}>()
</script>

<template>
  <FlexContainer class="tags-filtred-container" align-items="center">
    <TagView2
      v-for="(tag, i) in props.includeTags"
      :key="i"
      :tag="tag"
      class="tag"
      type="include"
    />

    <TagView2
      v-for="(tag, i) in props.excludeTags"
      :key="i"
      :tag="tag"
      class="tag"
      type="exclude"
    />
  </FlexContainer>
</template>

<style scoped lang="scss">
$border-radius: 100px;

.tags-filtred-container {
  overflow: auto;
  width: 100%;

  & .tag {
    margin: 0 3px;
    width: auto;
    max-width: 110px;
  }
}
</style>
