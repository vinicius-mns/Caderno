<script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeButton from '../atoms/ThemeButton.vue'
const { style } = useStyle()

const props = defineProps<{
  tag: {
    emoji: string
    content: string
    id: string
  }
  type?: 'complete' | 'emojiOnly'
}>()

const emit = defineEmits<{
  (e: 'emitId', v: string): void
}>()

const emitId = () => emit('emitId', props.tag.id)
</script>

<template>
  <ThemeButton class="tag" @click="emitId" :title="props.tag.content">
    <p class="emoji">{{ props.tag.emoji }}</p>
    <p class="content">{{ props.tag.content }}</p>
  </ThemeButton>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 8px;
.tag {
  width: 100%;
  height: $buttonSize;
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  & .emoji {
    font-size: calc($buttonSize - 8px);
    margin-left: $margin;
  }
  & .content {
    overflow: hidden;
    margin-left: $margin;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    padding-right: 10px;
  }
}
</style>
