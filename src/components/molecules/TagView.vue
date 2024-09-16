<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'

const props = withDefaults(defineProps<{ tag: Itag; tagEmojiSize?: string }>(), {
  tagEmojiSize: '18px'
})
</script>

<template>
  <FlexContainer :title="props.tag[1]" class="tag-container" align-items="center">
    <FlexContainer align-items="center" :style="{ height: '100%' }" class="emoji">
      <span>{{ props.tag[0] }}</span>
    </FlexContainer>
    <ThemeP class="content" :content="props.tag[1]" />
  </FlexContainer>
</template>

<style scoped lang="scss">
$height: 32px;
.tag-container {
  height: $height;
  width: 100%;
  flex-shrink: 0;
  & .emoji {
    margin-left: 10px;
    font-size: v-bind('props.tagEmojiSize');
  }
  & .content {
    margin-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}
</style>
