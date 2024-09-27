<script setup lang="ts">
import { ref } from 'vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeP from '../atoms/ThemeP.vue'
import CoinButton from '../molecules/CoinButton.vue'

const props = defineProps<{ tagsSelected: Itag[] }>()
</script>

<template>
  <FlexContainer class="tags-selected-container">
    <CoinButton
      v-for="(tag, i) in props.tagsSelected"
      :key="i"
      :description="tag[1]"
      class="tag"
      :border="false"
      background-color="transparent"
    >
      <ThemeP :content="tag[0]" class="tag-emoji" />
    </CoinButton>
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
