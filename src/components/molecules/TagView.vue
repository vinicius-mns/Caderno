<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'emitTag', v: ITag): void }>()

const emitTag = () => emit('emitTag', props.tag)
</script>

<template>
  <ThemeButton :title="props.tag.content" @click="emitTag" class="tag-container">
    <span class="emoji">{{ props.tag.emoji }}</span>
    <ThemeP class="content" :content="props.tag.content" />
  </ThemeButton>
</template>

<style scoped lang="scss">
$height: 42px;
$margin: 4px;
.tag-container {
  width: 100%;
  height: $height;
  flex-shrink: 0;
  margin: $margin 0;
  display: flex;
  align-items: center;
  position: relative;
  & .emoji {
    font-size: calc($height / 2.2);
  }
  & .content {
    font-size: 13px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}
</style>
