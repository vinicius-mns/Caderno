<script setup lang="ts">
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeP from '../atoms/ThemeP.vue'
import ButtonCoinSlot from './ButtonCoinSlot.vue'

const props = defineProps<{ tagsSelected: Itag[] }>()
</script>

<template>
  <FlexContainer class="tags-selected-container">
    <ButtonCoinSlot
      v-for="(tag, i) in props.tagsSelected"
      :key="i"
      :content="tag[1]"
      :border="false"
      class="tag"
      background-color="transparent"
    >
      <ThemeP :content="tag[0]" class="tag-emoji" />
    </ButtonCoinSlot>
  </FlexContainer>
</template>

<style scoped lang="scss">
.tags-selected-container {
  width: 100%;
  overflow: hidden;
  & .tag {
    margin-left: 5px;
    & .tag-emoji {
      opacity: 50%;
    }
  }
}
</style>
