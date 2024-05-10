<script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeButton from '../atoms/ThemeButton.vue'
import { reactive } from 'vue'

const { atualStyle } = useStyle()

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

const emojiFocus = reactive({
  value: false,
  focus: () => (emojiFocus.value = true),
  noFocus: () => (emojiFocus.value = false)
})

const emitId = () => emit('emitId', props.tag.id)
</script>

<template>
  <ThemeButton
    class="tag"
    :title="props.tag.content"
    @click="emitId"
    @mouseenter="emojiFocus.focus"
    @mouseleave="emojiFocus.noFocus"
  >
    <p :class="[emojiFocus.value ? 'emojiFocus' : '', 'emoji']">{{ props.tag.emoji }}</p>
    <p class="content">{{ props.tag.content }}</p>
  </ThemeButton>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
$margin: 12px;
$borderRadius: 8;
.tag {
  width: 100%;
  height: $buttonSize;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: $borderRadius;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: transparent;
  & .emoji {
    font-size: calc($buttonSize / 2);
    filter: grayscale(100%);
  }
  & .emojiFocus {
    filter: grayscale(0);
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
