<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = withDefaults(defineProps<{ tag: Itag; tagEmojiSize?: string }>(), {
  tagEmojiSize: '18px'
})

const emit = defineEmits<{ (e: 'emitTagUpdated', v: Itag): void }>()

const emitTag = () => emit('emitTagUpdated', props.tag)
</script>

<template>
  <div :title="props.tag[1]" @click="emitTag" class="tag-container">
    <span class="emoji">{{ props.tag[0] }}</span>
    <ThemeP class="content" :content="props.tag[1]" />
  </div>
</template>

<style scoped lang="scss">
$height: 40px;
.tag-container {
  height: $height;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: relative;
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
